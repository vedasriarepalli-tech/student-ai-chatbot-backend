# 🤖 Student AI Chatbot

An AI-powered chatbot application built using Node.js, Express.js, and Ollama that allows students to ask questions and receive intelligent responses.

## 📌 Project Overview

The Student AI Chatbot is a full-stack application that connects a frontend interface with a backend API and a locally running AI model.

It uses Ollama with the Llama 3.2 model to generate responses to user questions. The application also supports chat history to maintain previous conversations.

## 🚀 Technologies Used

- **JavaScript** – Programming language
- **Node.js** – JavaScript runtime environment
- **Express.js** – Backend framework
- **Ollama** – Local AI model integration
- **Llama 3.2** – Large Language Model (LLM)
- **HTML, CSS, JavaScript** – Frontend development
- **Postman** – API testing
- **Git & GitHub** – Version control and project management

## ✨ Features

- AI-powered chatbot responses.
- Frontend and backend integration.
- Chat history management.
- REST API development using Express.js.
- Local AI model integration using Ollama.
- JSON-based request and response handling.
- API testing using Postman.

## ⚙️ How It Works

1. The user enters a question in the frontend.
2. The frontend sends the question to the backend through an API.
3. Express.js receives and processes the request.
4. The backend communicates with Ollama.
5. Llama 3.2 generates an AI response.
6. The backend sends the response back to the frontend.
7. The conversation is maintained in chat history.

## 📂 Project Structure

```text
Student-AI-Chatbot/
│
├── frontend/
├── backend/
├── server.js
├── package.json
├── package-lock.json
├── README.md
└── other project files
```

*Note: Update the folder structure to match your actual project.*

## 💻 Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Folder

```bash
cd Student-AI-Chatbot
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Install and Start Ollama

Make sure Ollama is installed and the Llama 3.2 model is available.

```bash
ollama pull llama3.2
```

### 5. Start the AI Model

```bash
ollama run llama3.2
```

### 6. Start the Backend Server

```bash
node server.js
```

### 7. Open the Frontend

Open your frontend using the method configured in your project.

## 🧪 API Testing

The backend API can be tested using Postman.

**Example API Request:**

- Method: POST
- Endpoint: `http://localhost:YOUR_PORT/api/chat`
- Content-Type: application/json

**Request Body:**

```json
{
  "message": "What is Machine Learning?"
}
```

**Expected Response:**

```json
{
  "user_message": "What is Machine Learning?",
  "bot_response": "Machine Learning is a branch of AI..."
}
```


## 🎯 Learning Outcomes

- Understanding backend development.
- Building REST APIs using Node.js and Express.js.
- Connecting frontend with backend.
- Integrating Large Language Models (LLMs).
- Working with Ollama.
- Managing chat history.
- Testing APIs using Postman.
- Using Git and GitHub for version control.


