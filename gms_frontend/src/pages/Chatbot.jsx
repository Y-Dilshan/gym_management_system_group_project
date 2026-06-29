import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi 👋 I am your Smart Gym AI Assistant. Ask me anything about workouts, nutrition, BMI, or fitness plans 💪",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Send message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // ✅ FIXED: Using proper environment variable
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chatbot`, {
        message: input,
      });

      const aiMessage = {
        role: "assistant",
        text: res.data.reply,
      };

      setMessages([...updatedMessages, aiMessage]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          text: "⚠️ Error connecting to AI server. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-blue-600 text-white p-4 text-center font-bold text-xl">
        🏋️ Smart Gym AI Chatbot
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 max-w-[75%] rounded-2xl shadow text-sm whitespace-pre-wrap
              ${
                msg.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-black rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-500 text-sm ml-2">
            AI is typing...
          </div>
        )}
      </div>

      {/* INPUT AREA */}
      <div className="p-3 border-t bg-white flex gap-2">

        <input
          className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Ask your gym question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send"}
        </button>

      </div>
    </div>
  );
};

export default Chatbot;