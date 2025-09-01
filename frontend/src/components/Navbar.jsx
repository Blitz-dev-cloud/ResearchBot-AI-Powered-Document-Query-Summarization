import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Bot } from "lucide-react";
import { logout } from "../api/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Bot className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">ResearchBot</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
