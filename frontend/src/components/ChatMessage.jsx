import React from "react";
import { User, Bot } from "lucide-react";

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`flex max-w-3xl ${isUser ? "flex-row-reverse" : "flex-row"}`}
      >
        <div className={`flex-shrink-0 ${isUser ? "ml-3" : "mr-3"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isUser ? "bg-blue-600" : "bg-gray-600"
            }`}
          >
            {isUser ? (
              <User className="h-5 w-5 text-white" />
            ) : (
              <Bot className="h-5 w-5 text-white" />
            )}
          </div>
        </div>
        <div
          className={`px-4 py-2 rounded-lg ${
            isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
          }`}
        >
          <p className="whitespace-pre-wrap">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
