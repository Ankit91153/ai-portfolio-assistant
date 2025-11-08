import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import EnhancedPineconeRAGHandler from "./config/ragHandler.js";


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Initialize Pinecone RAG Handler
console.log("🚀 Initializing Pinecone RAG System...");
const ragHandler = new EnhancedPineconeRAGHandler();
await ragHandler.initialize();

// Initialize Groq AI
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Health Check
app.get("/health", (req, res) => {
  res.json({ 
    status: 200, 
    message: "Portfolio RAG Server is healthy"
  });
});

// Main Ask Endpoint - Handles all queries with smart routing
app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ 
        error: "Question is required"
      });
    }

    // Get relevant context using smart routing
    const ragResult = await ragHandler.smartQuery(question);
    const enhancedResponse = ragHandler.generateEnhancedResponse(ragResult);

    // Generate AI response
    const aiResponse = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: enhancedResponse.systemPrompt
        },
        {
          role: "user", 
          content: `Context: ${enhancedResponse.context}\n\nQuestion: ${question}`
        }
      ],
       model: "openai/gpt-oss-20b",
      temperature: 0.7,
      max_tokens: 1000
    });

    const answer = aiResponse.choices[0]?.message?.content || "I couldn't generate a response.";

    res.json({
      success: true,
      answer: answer,
      metadata: {
        documentsFound: ragResult.metadata.totalResults,
        relevance: `${(ragResult.metadata.avgRelevance * 100).toFixed(1)}%`,
        categories: ragResult.metadata.categories
      }
    });

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ 
      success: false,
      error: "Something went wrong"
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio RAG Server running on http://localhost:${PORT}`);
  console.log(`📋 Endpoints: GET /health, POST /ask`);
});