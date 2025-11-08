import { PROJECT_LINKS } from "../data/projectLinks.js";
import { isGeneralKnowledgeQuestion } from "./queryClassifier.js";

/**
 * Get project-specific links based on user query
 * @param {string} lowerQuestion - Lowercase user question
 * @returns {string|null} - Formatted response with project links or null
 */
export const getProjectLinks = (lowerQuestion) => {
  for (const [projectKey, projectData] of Object.entries(PROJECT_LINKS)) {
    if (lowerQuestion.includes(projectKey)) {
      // Check what type of link is requested
      if (lowerQuestion.includes('github') || lowerQuestion.includes('code') || lowerQuestion.includes('repository')) {
        return `Here's the GitHub repository for **${projectData.name}**:\n\n🐙 **GitHub**: ${projectData.github}\n\nYou can also check out the live demo: ${projectData.demo}`;
      }
      if (lowerQuestion.includes('demo') || lowerQuestion.includes('live') || lowerQuestion.includes('website') || lowerQuestion.includes('link')) {
        return `Here's the live demo for **${projectData.name}**:\n\n🌐 **Live Demo**: ${projectData.demo}\n\nYou can also view the source code: ${projectData.github}`;
      }
      // Default: return both links
      return `Here are the links for **${projectData.name}**:\n\n🐙 **GitHub**: ${projectData.github}\n🌐 **Live Demo**: ${projectData.demo}`;
    }
  }
  return null;
};

/**
 * Generate quick responses for simple queries
 * @param {string} question - User's question
 * @returns {string|null} - Quick response or null if no match
 */
export const getQuickResponse = (question) => {
  const lowerQuestion = question.toLowerCase();

  // Check for general knowledge questions first
  if (isGeneralKnowledgeQuestion(question)) {
    return "I'm Ankit's portfolio assistant, so I can only answer questions about his background, projects, skills, and experience. For general knowledge questions, you might want to try a general AI assistant or search engine instead!\n\nFeel free to ask me about Ankit's work, projects, or how to connect with him!";
  }

  // Project-specific link requests
  const projectLinkResponse = getProjectLinks(lowerQuestion);
  if (projectLinkResponse) {
    return projectLinkResponse;
  }

  // GitHub profile requests
  if (
    lowerQuestion.includes("github") &&
    (lowerQuestion.includes("link") ||
      lowerQuestion.includes("profile") ||
      lowerQuestion.includes("repository"))
  ) {
    return "Here's my GitHub profile: **https://github.com/Ankit91153**\n\nYou can find all my projects and code repositories there!";
  }

  // LinkedIn requests (but not general "what is linkedin")
  if (
    (lowerQuestion.includes("linkedin") ||
      (lowerQuestion.includes("connect") && !lowerQuestion.includes("how"))) &&
    !lowerQuestion.startsWith("what is")
  ) {
    return "Connect with me on LinkedIn: **https://linkedin.com/in/ankit-kumar-pandey-36b72220b**";
  }

  // Email requests
  if (lowerQuestion.includes("email") || lowerQuestion.includes("mail")) {
    return "You can reach me at: **ankitpandey91153@gmail.com**";
  }

  // Contact info requests
  if (lowerQuestion.includes("contact") && !lowerQuestion.includes("how")) {
    return "📧 **Email**: ankitpandey91153@gmail.com\n🐙 **GitHub**: https://github.com/Ankit91153\n💼 **LinkedIn**: https://linkedin.com/in/ankit-kumar-pandey-36b72220b\n🐦 **Twitter**: @Ankit91153";
  }

  // Resume/CV requests
  if (lowerQuestion.includes("resume") || lowerQuestion.includes("cv")) {
    return "You can download my resume from the **Resume** section of my portfolio website, or view my experience on LinkedIn.";
  }

  return null; // No quick response available
};