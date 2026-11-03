
const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const chatBox = document.getElementById("chat-box");
const button = document.getElementById("send-button");
const status = document.getElementById("status");

const historyButton = document.getElementById("history-button");
const clearButton = document.getElementById("clear-button");
const historyBox = document.getElementById("history-box");

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = "message " + sender;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Send message to AI
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  button.disabled = true;
  status.textContent = "AI is thinking...";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    addMessage(data.reply, "bot");
    status.textContent = "";

  } catch (error) {
    addMessage("Error: " + error.message, "bot");
    status.textContent = "Please check your backend and Ollama.";

  } finally {
    button.disabled = false;
  }
});

// View saved chat history
historyButton.addEventListener("click", async () => {
  historyBox.textContent = "Loading history...";

  try {
    const response = await fetch("/api/history");

    if (!response.ok) {
      throw new Error("Failed to load history");
    }

    const chats = await response.json();
    historyBox.replaceChildren();

    if (chats.length === 0) {
      historyBox.textContent = "No previous chats found.";
      return;
    }

    chats.forEach(chat => {
      const item = document.createElement("div");
      item.className = "history-item";

      const question = document.createElement("p");
      question.textContent = "You: " + chat.user_message;

      const answer = document.createElement("p");
      answer.textContent = "AI: " + chat.bot_response;

      const date = document.createElement("small");
      date.textContent = "Date: " + chat.created_at;

      item.append(question, answer, date);
      historyBox.appendChild(item);
    });

  } catch (error) {
    historyBox.textContent = "Could not load chat history.";
  }
});

// Clear saved chat history
clearButton.addEventListener("click", async () => {
  if (!confirm("Are you sure you want to delete all chat history?")) {
    return;
  }

  try {
    const response = await fetch("/api/history", {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Could not clear history");
    }

    historyBox.textContent = "Chat history cleared successfully!";

  } catch (error) {
    historyBox.textContent = error.message;
  }
});
