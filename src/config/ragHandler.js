import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { PineconeStore } from "@langchain/pinecone";
import {
  enhancePineconeContext,
  enhanceQuery,
} from "./pineconeSystemPrompts.js";


class EnhancedPineconeRAGHandler {
  constructor() {
    this.pinecone = new PineconeClient({
      apiKey: process.env.PINECONE_API_KEY,
    });
    this.indexName = process.env.PINECONE_INDEX_NAME;
    this.pineconeIndex = null;
    this.vectorStore = null;
    this.embeddings = null;
  }

  async initialize() {
    try {
      console.log("🚀 Initializing Pinecone RAG Handler...");

      this.pineconeIndex = this.pinecone.Index(this.indexName);

      this.embeddings = new HuggingFaceInferenceEmbeddings({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        apiKey: process.env.HF_TOKEN,
      });

      this.vectorStore = new PineconeStore(this.embeddings, {
        pineconeIndex: this.pineconeIndex,
      });

      console.log("✅ Pinecone RAG Handler initialized");
    } catch (error) {
      console.error("❌ Failed to initialize Pinecone RAG Handler:", error);
      throw error;
    }
  }

  async queryWithEnhancedContext(query, options = {}) {
    if (!this.vectorStore) {
      await this.initialize();
    }

    const {
      k = 5,
      categoryFilter = null,
      priorityFilter = null,
      minRelevanceScore = 0.0,
      enhanceQueryText = true,
    } = options;

    try {
      // Enhance query for better semantic search
      const processedQuery = enhanceQueryText ? enhanceQuery(query) : query;

      // Build filter for metadata
      let filter = {};
      if (categoryFilter) filter.category = { $eq: categoryFilter };
      if (priorityFilter) filter.priority = { $eq: priorityFilter };

      console.log(`🔍 Searching Pinecone: "${processedQuery}"`);

      // Query Pinecone
      const results = await this.vectorStore.similaritySearchWithScore(
        processedQuery,
        k,
        Object.keys(filter).length > 0 ? filter : undefined
      );

      // Process results
      const retrievedDocs = results
        .map(([doc, score]) => ({
          pageContent: doc.pageContent,
          metadata: doc.metadata,
          score: score,
          relevanceScore: (1 - score) * (doc.metadata.relevance_boost || 1.0),
        }))
        .filter((doc) => doc.relevanceScore >= minRelevanceScore)
        .sort((a, b) => b.relevanceScore - a.relevanceScore);

      // Enhance context
      const enhancedContext = enhancePineconeContext(retrievedDocs, query);

      return {
        query: query,
        retrievedDocuments: retrievedDocs,
        enhancedContext: enhancedContext.enhancedContext,
        systemPrompt: enhancedContext.systemPrompt,
        context: enhancedContext.context,
        metadata: {
          totalResults: retrievedDocs.length,
          avgRelevance:
            retrievedDocs.length > 0
              ? retrievedDocs.reduce(
                  (sum, doc) => sum + doc.relevanceScore,
                  0
                ) / retrievedDocs.length
              : 0,
          categories: [
            ...new Set(
              retrievedDocs.map((doc) => doc.metadata?.category).filter(Boolean)
            ),
          ],
          priorities: [
            ...new Set(
              retrievedDocs.map((doc) => doc.metadata?.priority).filter(Boolean)
            ),
          ],
          highRelevanceDocs: retrievedDocs.filter(
            (doc) => doc.relevanceScore > 0.8
          ).length,
        },
      };
    } catch (error) {
      console.error("❌ Error querying Pinecone:", error);
      throw error;
    }
  }

  // Smart query routing - automatically detects query type and optimizes search
  async smartQuery(query) {
    const lowerQuery = query.toLowerCase();

    // Technical skills routing
    if (
      /\b(skill|tech|programming|code|framework|language|database|api|development|mern|react|node|typescript|javascript|mongodb|express)\b/.test(
        lowerQuery
      )
    ) {
      return this.queryWithEnhancedContext(query, {
        categoryFilter: "technical",
        k: 4,
        minRelevanceScore: 0.3,
      });
    }

    // Projects routing
    if (
      /\b(project|built|created|portfolio|app|website|studynotion|ai generator|ankitverse|netflix|youtube|weather|addnote)\b/.test(
        lowerQuery
      )
    ) {
      return this.queryWithEnhancedContext(query, {
        categoryFilter: "projects",
        k: 5,
        minRelevanceScore: 0.2,
      });
    }

    // Contact routing
    if (
      /\b(contact|reach|connect|social|github|linkedin|email|twitter|instagram|phone|address)\b/.test(
        lowerQuery
      )
    ) {
      return this.queryWithEnhancedContext(query, {
        categoryFilter: "contact",
        k: 2,
        minRelevanceScore: 0.4,
      });
    }

    // Professional routing
    if (
      /\b(work|job|experience|career|role|company|examroom|current|position|employment)\b/.test(
        lowerQuery
      )
    ) {
      return this.queryWithEnhancedContext(query, {
        categoryFilter: "professional",
        k: 3,
        minRelevanceScore: 0.3,
      });
    }

    // Personal routing
    if (
      /\b(about|who|background|education|personal|hobbies|interests|philosophy|journey|story|life)\b/.test(
        lowerQuery
      )
    ) {
      return this.queryWithEnhancedContext(query, {
        categoryFilter: "personal",
        k: 3,
        minRelevanceScore: 0.3,
      });
    }

    // High priority content for general queries
    if (/\b(tell me|what|how|why|describe|explain)\b/.test(lowerQuery)) {
      return this.queryWithEnhancedContext(query, {
        priorityFilter: "high",
        k: 4,
        minRelevanceScore: 0.2,
      });
    }

    // Default general query
    return this.queryWithEnhancedContext(query, {
      k: 6,
      minRelevanceScore: 0.1,
    });
  }

  // Generate enhanced response for AI
  generateEnhancedResponse(ragResult) {
    const { context, systemPrompt, metadata } = ragResult;

    const fullPrompt = `${systemPrompt}

CONTEXT FROM ANKIT'S PORTFOLIO:
${context}

USER QUERY: ${ragResult.query}

Respond as Ankit Kumar Pandey in first person with specific details from the context.`;

    return {
      prompt: fullPrompt,
      context: context,
      systemPrompt: systemPrompt,
      metadata: metadata,
    };
  }
}

export default EnhancedPineconeRAGHandler;
