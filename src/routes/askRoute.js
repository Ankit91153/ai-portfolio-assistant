import { getQuickResponse } from "../utils/responseGenerator.js";
import { CONCISE_SYSTEM_PROMPT, AI_CONFIG } from "../config/systemPrompts.js";

/**
 * Handle the /ask endpoint logic
 * @param {Object} ragHandler - RAG handler instance
 * @param {Object} groq - Groq AI instance
 * @returns {Function} - Express route handler
 */
export const createAskHandler = (ragHandler, groq) => {
  return async (req, res) => {
    try {
      const { question } = req.body;

      if (!question) {
        return res.status(400).json({
          error: "Question is required",
        });
      }

      // Check for quick responses first
      const quickResponse = getQuickResponse(question);
      if (quickResponse) {
        return res.json({
          success: true,
          answer: quickResponse,
          metadata: {
            documentsFound: 0,
            relevance: "100.0%",
            categories: ["quick_response"],
            responseType: "direct",
          },
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
            content: CONCISE_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: `Context: ${enhancedResponse.context}\n\nQuestion: ${question}\n\nProvide a concise, direct response. Only elaborate if specifically asked for details.`,
          },
        ],
        model: AI_CONFIG.model,
        temperature: AI_CONFIG.temperature,
        max_tokens: AI_CONFIG.max_tokens,
      });

      const answer =
        aiResponse.choices[0]?.message?.content ||
        "I couldn't generate a response.";

      res.json({
        success: true,
        answer: answer,
        metadata: {
          documentsFound: ragResult.metadata.totalResults,
          relevance: `${(ragResult.metadata.avgRelevance * 100).toFixed(1)}%`,
          categories: ragResult.metadata.categories,
          responseType: "rag_enhanced",
        },
      });
    } catch (error) {
      console.error("❌ Error:", error);
      res.status(500).json({
        success: false,
        error: "Something went wrong",
      });
    }
  };
};