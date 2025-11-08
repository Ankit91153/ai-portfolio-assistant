import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { PineconeStore } from "@langchain/pinecone";
import { ENHANCED_PINECONE_DATA } from "../data/enhancedPineconeData.js";


async function setupEnhancedPinecone() {
  console.log("🚀 Setting up Enhanced Pinecone RAG System...");
  
  const pinecone = new PineconeClient({
    apiKey: process.env.PINECONE_API_KEY,
  });

  const indexName = process.env.PINECONE_INDEX_NAME;
  const pineconeIndex = pinecone.Index(indexName);

  console.log("🧹 Clearing existing vectors...");
  await pineconeIndex.deleteAll();
  
  // Wait for deletion to complete
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log("📊 Preparing enhanced documents with metadata...");
  const allDocuments = ENHANCED_PINECONE_DATA.map((item, index) => {
    // Create enhanced content for better semantic search
    const enhancedContent = `${item.content}

Keywords: ${item.keywords.join(", ")}
Category: ${item.category}
Context: ${item.context_type}`;

    return {
      pageContent: enhancedContent,
      metadata: {
        // Core identification
        id: String(item.id),
        topic: item.topic,
        category: item.category,
        priority: item.priority,
        context_type: item.context_type,
        
        // Enhanced metadata for better retrieval
        relevance_boost: item.relevance_boost || 1.0,
        keywords: item.keywords.join("|"), // Pipe-separated for easy splitting
        content_length: item.content.length,
        
        // Technical classification
        technical_depth: item.category === 'technical' ? 'advanced' : 
                        item.category === 'projects' ? 'intermediate' : 'basic',
        audience: item.priority === 'high' ? 'general' : 'specific',
        
        // Indexing metadata
        chunkIndex: index,
        created_at: new Date().toISOString(),
        
        // Original content for exact matching
        original_content: item.content
      },
    };
  });

  // Generate unique IDs for each document
  const ids = allDocuments.map((doc) => `ankit_portfolio_${doc.metadata.id}`);

  console.log("🤖 Initializing HuggingFace embeddings...");
  const embeddings = new HuggingFaceInferenceEmbeddings({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    apiKey: process.env.HF_TOKEN,
  });

  console.log("📤 Creating Pinecone vector store...");
  const vectorStore = new PineconeStore(embeddings, { pineconeIndex });

  console.log("⚡ Embedding and storing documents...");
  await vectorStore.addDocuments(allDocuments, { ids });

  console.log(`✅ Successfully embedded and stored ${allDocuments.length} enhanced documents!`);
  
  // Display summary statistics
  const categories = [...new Set(allDocuments.map(doc => doc.metadata.category))];
  const priorities = [...new Set(allDocuments.map(doc => doc.metadata.priority))];
  
  console.log("\n📈 Setup Summary:");
  console.log(`📋 Total Documents: ${allDocuments.length}`);
  console.log(`🏷️  Categories: ${categories.join(", ")}`);
  console.log(`⭐ Priorities: ${priorities.join(", ")}`);
  console.log(`🔍 Average Content Length: ${Math.round(allDocuments.reduce((sum, doc) => sum + doc.metadata.content_length, 0) / allDocuments.length)} characters`);
  
  // Test the setup with a sample query
  console.log("\n🧪 Testing with sample queries...");
  
  const testQueries = [
    "What are Ankit's technical skills?",
    "Tell me about StudyNotion project",
    "How can I contact Ankit?"
  ];
  
  for (const query of testQueries) {
    console.log(`\n🔍 Testing: "${query}"`);
    const results = await vectorStore.similaritySearch(query, 2);
    results.forEach((result, index) => {
      console.log(`  ${index + 1}. [${result.metadata.category}] ${result.metadata.topic}`);
      console.log(`     Relevance: ${result.metadata.relevance_boost}x | Priority: ${result.metadata.priority}`);
    });
  }
  
  console.log("\n🎉 Enhanced Pinecone RAG setup completed successfully!");
}

// Enhanced query function for testing
export async function queryEnhancedPinecone(query, options = {}) {
  const pinecone = new PineconeClient({
    apiKey: process.env.PINECONE_API_KEY,
  });

  const indexName = process.env.PINECONE_INDEX_NAME;
  const pineconeIndex = pinecone.Index(indexName);

  const embeddings = new HuggingFaceInferenceEmbeddings({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    apiKey: process.env.HF_TOKEN,
  });

  const vectorStore = new PineconeStore(embeddings, { pineconeIndex });
  
  const {
    k = 5,
    filter = {},
    includeMetadata = true
  } = options;

  try {
    const results = await vectorStore.similaritySearchWithScore(query, k, filter);
    
    return results.map(([doc, score]) => ({
      content: doc.pageContent,
      metadata: doc.metadata,
      score: score,
      relevanceScore: (1 - score) * (doc.metadata.relevance_boost || 1.0)
    }));
  } catch (error) {
    console.error("Error querying Pinecone:", error);
    throw error;
  }
}

// Run the enhanced setup
if (import.meta.url === `file://${process.argv[1]}`) {
  setupEnhancedPinecone().catch(console.error);
}

export default setupEnhancedPinecone;
