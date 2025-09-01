import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import ChatMessage from "../components/ChatMessage.jsx";
import { sendQuery } from "../api/chat";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setLoading(true);
    setError("");

    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);

    try {
      const response = await sendQuery(userMessage);
      setMessages((prev) => [
        ...prev,
        { text: response.answer || response.message, isUser: false },
      ]);
    } catch (err) {
      setError(err.detail || "Failed to send message");
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I encountered an error processing your request.",
          isUser: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                  <p className="text-lg mb-2">
                    Start a conversation with ResearchBot
                  </p>
                  <p>Ask questions about your uploaded documents!</p>
                </div>
              )}

              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message.text}
                  isUser={message.isUser}
                />
              ))}

              {loading && (
                <div className="flex justify-start mb-4">
                  <div className="flex items-center space-x-2 bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="border-t border-gray-200 bg-white p-4">
            <div className="max-w-4xl mx-auto">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="flex space-x-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about your documents..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
                <button
                  onClick={handleSubmit}
                  disabled={loading || !input.trim()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;
