import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import EnhancedPineconeRAGHandler from "./config/ragHandler.js";
import { createAskHandler } from "./routes/askRoute.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// Initialize services
console.log("🚀 Initializing Portfolio RAG System...");
const ragHandler = new EnhancedPineconeRAGHandler();
await ragHandler.initialize();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Routes
app.get("/health", (req, res) => {
  res.json({
    status: 200,
    message: "Portfolio RAG Server is healthy",
  });
});

app.post("/ask", createAskHandler(ragHandler, groq));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio RAG Server running on http://localhost:${PORT}`);
  console.log(`📋 Endpoints: GET /health, POST /ask`);
});