# 🤖 Smart Portfolio Chatbot

An intelligent AI assistant that answers questions about Ankit Kumar Pandey's professional profile using advanced Retrieval-Augmented Generation (RAG) technology with Pinecone vector database.

## ✨ Features

- 🧠 **Smart Query Routing** - Automatically detects query type (technical/projects/contact/personal)
- 🔍 **Semantic Search** - Uses Pinecone vector database for accurate information retrieval
- 🤖 **AI-Powered Responses** - Groq AI generates natural, contextual answers
- 📊 **Enhanced Context** - Relevance scoring and priority-based ranking
- ⚡ **Fast & Accurate** - Optimized search with category filtering
- 🎯 **Single Endpoint** - Simple `/ask` API for all queries

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Vector Database:** Pinecone
- **Embeddings:** HuggingFace Transformers (sentence-transformers/all-MiniLM-L6-v2)
- **AI Model:** Groq (Llama 3.1 70B)
- **Search:** Semantic similarity search with metadata filtering

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/smart-portfolio-chatbot.git
cd smart-portfolio-chatbot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your API keys
nano .env
```

### 4. Required API Keys

#### **Pinecone** (Vector Database)
1. Go to [Pinecone Console](https://app.pinecone.io/)
2. Create account and get API key
3. Create an index with dimension: 384

#### **HuggingFace** (Embeddings)
1. Go to [HuggingFace Tokens](https://huggingface.co/settings/tokens)
2. Create a read token

#### **Groq** (AI Model)
1. Go to [Groq Console](https://console.groq.com/keys)
2. Create API key

### 5. Setup Database
```bash
npm run setup
```

### 6. Start Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📡 API Usage

### **Health Check**
```bash
curl http://localhost:3001/health
```

### **Ask Questions**
```bash
curl -X POST http://localhost:3001/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What are Ankit'\''s technical skills?"}'
```

### **Example Queries**
- `"What technologies does Ankit use?"`
- `"Tell me about StudyNotion project"`
- `"How can I contact Ankit?"`
- `"What's his work experience?"`
- `"Show me his GitHub profile"`

## 🎯 How It Works

1. **Query Analysis** - Detects query type (technical/projects/contact/personal)
2. **Smart Routing** - Routes to appropriate category with optimized parameters
3. **Vector Search** - Finds most relevant documents in Pinecone
4. **Context Enhancement** - Ranks and formats retrieved information
5. **AI Generation** - Groq AI generates natural, first-person responses

## 📊 Response Format

```json
{
  "success": true,
  "answer": "I specialize in the MERN stack with over 3 years of experience...",
  "metadata": {
    "documentsFound": 4,
    "relevance": "87.3%",
    "categories": ["technical", "professional"]
  }
}
```

## 🏗️ Project Structure

```
smart-portfolio-chatbot/
├── src/
│   ├── config/
│   │   ├── pinecone.js              # Pinecone setup & data embedding
│   │   ├── ragHandler.js            # Main RAG logic & query processing
│   │   └── pineconeSystemPrompts.js # AI system prompts
│   ├── data/
│   │   └── enhancedPineconeData.js  # Portfolio data with metadata
│   └── server.js                    # Express API server
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore rules
└── package.json                     # Dependencies & scripts
```

## 🔧 Configuration

### **Environment Variables**
```env
PORT=3001
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_index_name
HF_TOKEN=your_huggingface_token
GROQ_API_KEY=your_groq_api_key
```

### **Pinecone Index Settings**
- **Dimension:** 384
- **Metric:** cosine
- **Pod Type:** p1.x1 (starter)

## 📈 Performance

- **Response Time:** ~500-800ms
- **Accuracy:** 85-95% relevance
- **Categories:** 6 content types (technical, projects, personal, professional, contact, achievements)
- **Documents:** 15 enhanced portfolio entries

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ankit Kumar Pandey**
- GitHub: [@Ankit91153](https://github.com/Ankit91153)
- LinkedIn: [Ankit Kumar Pandey](https://linkedin.com/in/ankit-kumar-pandey-36b72220b)
- Twitter: [@Ankit91153](https://twitter.com/Ankit91153)

## 🙏 Acknowledgments

- [Pinecone](https://pinecone.io/) for vector database
- [HuggingFace](https://huggingface.co/) for embeddings
- [Groq](https://groq.com/) for AI model
- [LangChain](https://langchain.com/) for RAG framework