import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, Upload, History, LayoutDashboard } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/chat", icon: MessageCircle, label: "Chatbot" },
    { path: "/upload", icon: Upload, label: "Upload PDFs" },
    { path: "/history", icon: History, label: "Chat History" },
  ];

  return (
    <div className="bg-white w-64 min-h-screen shadow-sm border-r border-gray-200">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
