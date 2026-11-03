const express = require("express");
const db = require("./db");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// POST API: Send message to AI chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Validate user message
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Please enter a message"
      });
    }

    // Connect to Ollama AI
    const response = await fetch(
      "http://localhost:11434/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama3.2:latest",
          messages: [
            {
              role: "user",
              content: message.trim()
            }
          ],
          stream: false
        })
      }
    );

    if (!response.ok) {
      throw new Error("Ollama request failed");
    }

    const data = await response.json();

    // Get AI response
    const reply = data.message.content;

    // Save question and answer in SQLite
    const saveChat = db.prepare(`
      INSERT INTO chats (user_message, bot_response)
      VALUES (?, ?)
    `);

    saveChat.run(message.trim(), reply);

    // Send AI response to frontend
    res.json({
      reply: reply
    });

  } catch (error) {
    console.error("Chat Error:", error.message);

    res.status(502).json({
      error: "Could not connect to Ollama or save the chat"
    });
  }
});


// GET API: Retrieve previous conversations
app.get("/api/history", (req, res) => {
  try {
    const history = db.prepare(`
      SELECT * FROM chats
      ORDER BY id DESC
    `).all();

    res.json(history);

  } catch (error) {
    console.error("History Error:", error.message);

    res.status(500).json({
      error: "Could not retrieve chat history"
    });
  }
});


app.delete("/api/history", (req, res) => {
  try {
    db.prepare("DELETE FROM chats").run();

    res.json({
      message: "Chat history cleared successfully"
    });

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      error: "Could not clear chat history"
    });
  }
});
// Start backend server
app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
