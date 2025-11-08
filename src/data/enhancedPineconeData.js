// Enhanced portfolio data optimized for Pinecone RAG system
export const ENHANCED_PINECONE_DATA = [
  {
    id: 1,
    topic: "personal_introduction_core",
    content: "I am Ankit Kumar Pandey, a passionate Full Stack Developer from Phagwara, Punjab, India. Currently working as a Full Stack Web Developer at Examroom.ai in Bengaluru. I hold a Bachelor's degree in Computer Applications (BCA) from R.I.E.T Campus, Phagwara. I describe myself as a lifelong learner and tech enthusiast who loves solving problems and creating innovative digital products that make a real impact.",
    keywords: ["Ankit Kumar Pandey", "Full Stack Developer", "Phagwara", "Punjab", "Examroom.ai", "Bengaluru", "BCA", "R.I.E.T Campus", "introduction", "background"],
    category: "personal",
    priority: "high",
    context_type: "identity",
    relevance_boost: 1.2
  },
  {
    id: 2,
    topic: "technical_expertise_mern_stack",
    content: "I specialize in the MERN stack with over 3 years of hands-on experience. My core expertise includes MongoDB for database management, Express.js for backend APIs, React.js for dynamic user interfaces, and Node.js for server-side development. I'm proficient in building scalable web applications, RESTful APIs, real-time features with Socket.io, and implementing secure authentication systems. I've successfully deployed applications serving 1000+ concurrent users.",
    keywords: ["MERN stack", "MongoDB", "Express.js", "React.js", "Node.js", "3 years experience", "scalable applications", "RESTful APIs", "Socket.io", "authentication", "1000+ users"],
    category: "technical",
    priority: "high",
    context_type: "core_skills",
    relevance_boost: 1.3
  },
  {
    id: 3,
    topic: "advanced_technical_skills",
    content: "Beyond the MERN stack, I'm skilled in TypeScript for type-safe development, Redux Toolkit and Zustand for state management, and Tailwind CSS for modern, responsive styling. I have experience with React Native for cross-platform mobile development, Next.js for server-side rendering and static site generation, and modern development tools including Webpack, Vite, Docker, and CI/CD pipelines. I'm also proficient in data structures, algorithms, and have a strong foundation in competitive programming.",
    keywords: ["TypeScript", "Redux Toolkit", "Zustand", "Tailwind CSS", "React Native", "Next.js", "mobile development", "SSR", "Webpack", "Vite", "Docker", "CI/CD", "data structures", "algorithms", "competitive programming"],
    category: "technical",
    priority: "high",
    context_type: "advanced_skills",
    relevance_boost: 1.1
  },
  {
    id: 4,
    topic: "current_role_examroom_ai",
    content: "At Examroom.ai, I work on cutting-edge educational technology solutions, developing interactive learning platforms and comprehensive assessment tools. My responsibilities include building user-friendly interfaces for students and educators, optimizing application performance for seamless user experience, implementing real-time features like live chat and collaborative tools, and working on both frontend React applications and backend Node.js services. I focus on creating scalable solutions that enhance the learning experience for thousands of users.",
    keywords: ["Examroom.ai", "educational technology", "learning platforms", "assessment tools", "interactive interfaces", "performance optimization", "real-time features", "live chat", "collaborative tools", "scalable solutions"],
    category: "professional",
    priority: "high",
    context_type: "current_work",
    relevance_boost: 1.2
  },
  {
    id: 5,
    topic: "flagship_project_studynotion",
    content: "StudyNotion is my flagship eLearning platform featuring a sophisticated multi-role architecture supporting admins, instructors, and students. Key technical features include a comprehensive course management system with video streaming capabilities, secure payment integration using Razorpay, real-time chat functionality, detailed progress tracking and analytics dashboard, user authentication and authorization, and a responsive design that works across all devices. Built entirely with the MERN stack, it demonstrates my full-stack expertise and can handle over 1000 concurrent users with optimized database queries and efficient caching strategies.",
    keywords: ["StudyNotion", "eLearning platform", "multi-role architecture", "course management", "video streaming", "Razorpay payment", "real-time chat", "progress tracking", "analytics dashboard", "authentication", "responsive design", "1000 concurrent users", "database optimization", "caching"],
    category: "projects",
    priority: "high",
    context_type: "major_project",
    relevance_boost: 1.4
  },
  {
    id: 6,
    topic: "ai_content_generator_project",
    content: "AI Content Generator Pro is an innovative SaaS application that leverages OpenAI's GPT models to generate high-quality content for various purposes including YouTube video scripts, blog posts, social media content, and code snippets. The platform features template-based content generation, content optimization suggestions, plagiarism detection, subscription management with tiered pricing, secure payment processing through Razorpay, and a user-friendly dashboard for content management. This project showcases my ability to integrate cutting-edge AI technologies with traditional web development, demonstrating skills in API integration, SaaS architecture, and modern UI/UX design.",
    keywords: ["AI Content Generator Pro", "SaaS application", "OpenAI GPT", "content generation", "YouTube scripts", "blog posts", "social media", "code snippets", "template-based", "plagiarism detection", "subscription management", "Razorpay", "AI integration", "API integration", "SaaS architecture"],
    category: "projects",
    priority: "high",
    context_type: "ai_project",
    relevance_boost: 1.3
  },
  {
    id: 7,
    topic: "ankitverse_developer_blog",
    content: "AnkitVerse is a specialized blogging platform designed for the developer community, where programmers share coding challenges, solutions, tutorials, and industry insights. The platform features a powerful markdown editor with syntax highlighting, comprehensive comment and discussion system, user profile management, content categorization and tagging, search functionality, and responsive design optimized for code readability. Built with the MERN stack, it emphasizes clean UI/UX design and provides an excellent developer experience with features like code snippet sharing, technical article templates, and community interaction tools.",
    keywords: ["AnkitVerse", "developer blogging platform", "coding challenges", "tutorials", "markdown editor", "syntax highlighting", "comment system", "user profiles", "content categorization", "search functionality", "code readability", "developer experience", "code snippets", "community interaction"],
    category: "projects",
    priority: "medium",
    context_type: "community_project",
    relevance_boost: 1.1
  },
  {
    id: 8,
    topic: "portfolio_smaller_projects",
    content: "I've developed several smaller projects that demonstrate diverse technical skills: Netflix Clone featuring responsive streaming UI with movie browsing and video player integration; YouTube Lite with video browsing interface and search functionality; Weather Application providing real-time weather data with geolocation integration; Add-To-Cart e-commerce functionality with shopping cart management; AddNote application with user authentication and real-time note synchronization; and Guess Number Game showcasing interactive gaming elements. Each project demonstrates specific technical competencies including responsive design, API integration, state management, and user experience optimization.",
    keywords: ["Netflix Clone", "YouTube Lite", "Weather Application", "Add-To-Cart", "AddNote", "Guess Number Game", "responsive design", "video player", "geolocation", "e-commerce", "authentication", "real-time sync", "interactive gaming", "API integration", "state management"],
    category: "projects",
    priority: "medium",
    context_type: "portfolio_projects",
    relevance_boost: 1.0
  },
  {
    id: 9,
    topic: "development_philosophy_approach",
    content: "My development philosophy centers around the principle 'Make it work, make it right, make it fast.' I believe in iterative development where I first focus on creating functional solutions, then refactor for clean, maintainable code, and finally optimize for performance. I emphasize code quality through proper documentation, comprehensive testing, and following industry best practices. User experience is paramount in my designs, and I always consider scalability and maintainability when architecting solutions. I'm passionate about continuous learning and staying updated with the latest technologies and development methodologies.",
    keywords: ["development philosophy", "Make it work make it right make it fast", "iterative development", "functional solutions", "clean code", "maintainable code", "performance optimization", "code quality", "documentation", "testing", "best practices", "user experience", "scalability", "continuous learning"],
    category: "philosophy",
    priority: "medium",
    context_type: "work_approach",
    relevance_boost: 1.0
  },
  {
    id: 10,
    topic: "emerging_technologies_interests",
    content: "I'm deeply passionate about emerging technologies and actively explore blockchain development, Web3 applications, decentralized systems, and smart contract development. I have hands-on experience with AI/ML integration in web applications, as demonstrated in my AI Content Generator project. I regularly participate in competitive programming to sharpen my problem-solving skills and contribute to open-source projects on GitHub. I stay current with industry trends through continuous learning, attending tech conferences, and experimenting with new frameworks and tools. My goal is to leverage these cutting-edge technologies to build innovative solutions that solve real-world problems.",
    keywords: ["blockchain development", "Web3 applications", "decentralized systems", "smart contracts", "AI/ML integration", "competitive programming", "open-source contributions", "GitHub", "industry trends", "tech conferences", "new frameworks", "innovative solutions", "real-world problems"],
    category: "interests",
    priority: "medium",
    context_type: "future_tech",
    relevance_boost: 1.1
  },
  {
    id: 11,
    topic: "technical_achievements_metrics",
    content: "My technical achievements include successfully deploying and maintaining applications that serve over 1000 concurrent users with 99.9% uptime. I've optimized database queries resulting in 60% reduction in response times and implemented caching strategies that improved application performance by 40%. I've contributed to open-source projects with repositories gaining 100+ GitHub stars and have mentored 5+ junior developers in full-stack development. I've conducted technical workshops on React.js and Node.js for developer communities and have implemented CI/CD pipelines that reduced deployment time by 70%. My code reviews and architectural decisions have helped teams deliver projects 25% faster while maintaining high code quality standards.",
    keywords: ["1000 concurrent users", "99.9% uptime", "database optimization", "60% response time reduction", "caching strategies", "40% performance improvement", "open-source contributions", "100+ GitHub stars", "mentored developers", "technical workshops", "CI/CD pipelines", "70% deployment reduction", "code reviews", "architectural decisions", "25% faster delivery"],
    category: "achievements",
    priority: "high",
    context_type: "metrics_results",
    relevance_boost: 1.2
  },
  {
    id: 12,
    topic: "personal_interests_lifestyle",
    content: "Outside of coding, I maintain a healthy work-life balance through strategic gaming, which enhances my problem-solving and analytical thinking skills. I'm passionate about traveling to explore different cultures and gain new perspectives that often inspire creative solutions in my development work. I enjoy photography during my travels and use it as a creative outlet. I'm also interested in fitness and believe that physical well-being directly impacts mental clarity and coding productivity. I regularly read tech blogs, follow industry leaders on social media, and participate in online developer communities to stay connected with the broader tech ecosystem.",
    keywords: ["work-life balance", "strategic gaming", "problem-solving skills", "analytical thinking", "traveling", "different cultures", "creative solutions", "photography", "creative outlet", "fitness", "mental clarity", "coding productivity", "tech blogs", "industry leaders", "developer communities", "tech ecosystem"],
    category: "personal",
    priority: "low",
    context_type: "lifestyle",
    relevance_boost: 0.8
  },
  {
    id: 13,
    topic: "contact_social_professional_presence",
    content: "I maintain an active professional presence across multiple platforms for networking and collaboration. Connect with me on GitHub at github.com/Ankit91153 to explore my code repositories, contributions, and open-source projects. Follow me on LinkedIn at linkedin.com/in/ankit-kumar-pandey-36b72220b for professional updates, industry insights, and networking opportunities. I'm active on Twitter @Ankit91153 where I share tech discussions, development tips, and industry news. For personal updates and behind-the-scenes content, you can find me on Instagram @ankitpandey3867. I'm always open to collaboration opportunities, mentoring requests, and interesting project discussions. Feel free to reach out for technical consultations, code reviews, or just to connect with a fellow developer.",
    keywords: ["GitHub", "github.com/Ankit91153", "code repositories", "open-source projects", "LinkedIn", "linkedin.com/in/ankit-kumar-pandey-36b72220b", "professional networking", "Twitter", "@Ankit91153", "tech discussions", "Instagram", "@ankitpandey3867", "collaboration opportunities", "mentoring", "technical consultations", "code reviews"],
    category: "contact",
    priority: "high",
    context_type: "social_presence",
    relevance_boost: 1.1
  },
  {
    id: 14,
    topic: "career_goals_future_aspirations",
    content: "My career trajectory is focused on becoming a senior full-stack architect and technical leader who can guide development teams and make strategic technical decisions for large-scale applications. I'm particularly interested in roles that involve system design, scalable architecture, and leading cross-functional teams. I aspire to contribute to product development from conception to deployment, leveraging my full-stack expertise to build products that impact millions of users. Long-term, I'm considering starting my own tech venture focused on educational technology or developer tools. I'm continuously building expertise in distributed systems, microservices architecture, and cloud technologies to prepare for these leadership roles.",
    keywords: ["senior full-stack architect", "technical leader", "development teams", "strategic technical decisions", "large-scale applications", "system design", "scalable architecture", "cross-functional teams", "product development", "millions of users", "tech venture", "educational technology", "developer tools", "distributed systems", "microservices architecture", "cloud technologies", "leadership roles"],
    category: "professional",
    priority: "medium",
    context_type: "career_goals",
    relevance_boost: 1.0
  },
  {
    id: 15,
    topic: "technical_problem_solving_approach",
    content: "When approaching technical challenges, I follow a systematic methodology: first, I thoroughly understand the problem requirements and constraints; then I research existing solutions and best practices; next, I design a scalable architecture considering future growth; I implement the solution using clean, well-documented code; finally, I test comprehensively and optimize for performance. I believe in breaking down complex problems into smaller, manageable components and using appropriate design patterns. I'm experienced in debugging complex issues, performance bottlenecks, and implementing monitoring and logging systems. My approach emphasizes maintainability, scalability, and team collaboration throughout the development process.",
    keywords: ["systematic methodology", "problem requirements", "constraints", "research solutions", "best practices", "scalable architecture", "future growth", "clean code", "well-documented", "comprehensive testing", "performance optimization", "complex problems", "manageable components", "design patterns", "debugging", "performance bottlenecks", "monitoring systems", "logging systems", "maintainability", "team collaboration"],
    category: "technical",
    priority: "medium",
    context_type: "problem_solving",
    relevance_boost: 1.1
  }
];

// Enhanced metadata for better Pinecone retrieval
export const PINECONE_METADATA_SCHEMA = {
  // Core identification
  id: "string",
  topic: "string",
  category: "string", // personal, technical, projects, professional, achievements, contact, interests, philosophy
  priority: "string", // high, medium, low
  context_type: "string", // identity, core_skills, major_project, etc.
  
  // Relevance and ranking
  relevance_boost: "number", // 0.8 to 1.4 for query ranking
  keywords: "array", // for semantic search enhancement
  
  // Content classification
  content_length: "number",
  technical_depth: "string", // basic, intermediate, advanced
  audience: "string", // general, technical, recruiter, developer
  
  // Temporal relevance
  recency: "string", // current, recent, historical
  update_frequency: "string" // static, dynamic, evolving
};

export default ENHANCED_PINECONE_DATA;