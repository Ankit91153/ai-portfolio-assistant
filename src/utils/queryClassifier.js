// Query classification utilities

/**
 * Check if question is asking for general knowledge vs portfolio-specific info
 * @param {string} question - User's question
 * @returns {boolean} - True if it's a general knowledge question
 */
export const isGeneralKnowledgeQuestion = (question) => {
  const lowerQuestion = question.toLowerCase();

  // General knowledge patterns
  const generalPatterns = [
    /^what is (a |an )?[a-z]+(\s[a-z]+)*\?*$/i, // "what is linkedin", "what is react"
    /^how does [a-z]+/i, // "how does javascript work"
    /^explain [a-z]+/i, // "explain machine learning"
    /^define [a-z]+/i, // "define api"
    /^tell me about (the )?[a-z]+(\s[a-z]+)*$/i, // "tell me about python" (without personal context)
  ];

  // Check if it matches general knowledge patterns
  const isGeneral = generalPatterns.some((pattern) =>
    pattern.test(lowerQuestion)
  );

  // But exclude if it's clearly about the person
  const isPersonalContext = /\b(your|you|ankit|my|me|i)\b/.test(lowerQuestion);

  return isGeneral && !isPersonalContext;
};