import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Upload, History } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to ResearchBot
            </h1>
            <p className="text-gray-600 mb-8">
              Your AI-powered research assistant
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                to="/chat"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <MessageCircle className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Start Chatting
                  </h3>
                </div>
                <p className="text-gray-600">
                  Ask questions about your uploaded documents
                </p>
              </Link>

              <Link
                to="/upload"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <Upload className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Upload PDFs
                  </h3>
                </div>
                <p className="text-gray-600">
                  Add new documents to your knowledge base
                </p>
              </Link>

              <Link
                to="/history"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <History className="h-8 w-8 text-purple-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Chat History
                  </h3>
                </div>
                <p className="text-gray-600">
                  View your previous conversations
                </p>
              </Link>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How it works
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Upload Documents
                    </h4>
                    <p className="text-gray-600">
                      Upload your PDF documents to build your knowledge base
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Ask Questions
                    </h4>
                    <p className="text-gray-600">
                      Chat with the AI about your documents using natural
                      language
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Get Answers</h4>
                    <p className="text-gray-600">
                      Receive accurate answers based on your document content
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
