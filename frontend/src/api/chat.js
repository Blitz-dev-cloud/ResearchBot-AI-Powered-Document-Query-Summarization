import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const chatAPI = axios.create({
  baseURL: `${API_URL}/chat`,
});

chatAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const sendQuery = async (query) => {
  try {
    const response = await chatAPI.post("/query", { query });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getChatHistory = async () => {
  try {
    const response = await chatAPI.get("/history");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
