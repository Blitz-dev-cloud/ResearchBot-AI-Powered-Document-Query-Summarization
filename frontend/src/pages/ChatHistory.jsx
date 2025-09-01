import React, { useState, useEffect } from "react";
import { MessageCircle, Calendar, User, Bot, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { getChatHistory } from "../api/chat";

const ChatHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const data = await getChatHistory();
      setHistory(data.history || data || []);
    } catch (err) {
      setError(err.detail || "Failed to load chat history");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Unknown date";
    }
  };

  const groupedHistory = history.reduce((acc, message) => {
    const sessionId = message.session_id || "default";
    if (!acc[sessionId]) {
      acc[sessionId] = [];
    }
    acc[sessionId].push(message);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <span className="text-gray-600">Loading chat history...</span>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Chat History
            </h1>
            <p className="text-gray-600 mb-8">
              View your previous conversations with ResearchBot
            </p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Chat Sessions
                </h2>
                {Object.keys(groupedHistory).length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No chat history found</p>
                    <p className="text-sm">
                      Start a conversation to see it here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(groupedHistory).map(
                      ([sessionId, messages]) => (
                        <div
                          key={sessionId}
                          onClick={() => setSelectedSession(sessionId)}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedSession === sessionId
                              ? "bg-blue-50 border-blue-200"
                              : "bg-white border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">
                              Session {sessionId.slice(-8)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {messages.length} messages
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {messages[0]?.query ||
                              messages[0]?.message ||
                              "No preview available"}
                          </p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(
                              messages[0]?.timestamp || messages[0]?.created_at
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              <div className="lg:col-span-2">
                {selectedSession ? (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Session {selectedSession.slice(-8)} Messages
                    </h2>
                    <div className="bg-white rounded-lg border border-gray-200 p-6 max-h-96 overflow-y-auto">
                      <div className="space-y-4">
                        {groupedHistory[selectedSession].map(
                          (message, index) => (
                            <div
                              key={index}
                              className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
                            >
                              {message.query && (
                                <div className="flex items-start space-x-3 mb-3">
                                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                    <User className="h-4 w-4 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-gray-900">
                                      {message.query}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {formatDate(
                                        message.timestamp || message.created_at
                                      )}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {message.response && (
                                <div className="flex items-start space-x-3">
                                  <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                                    <Bot className="h-4 w-4 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-gray-900 whitespace-pre-wrap">
                                      {message.response}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select a Chat Session
                    </h3>
                    <p className="text-gray-600">
                      Choose a session from the left to view the conversation
                      details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatHistory;
