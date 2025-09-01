import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const docsAPI = axios.create({
  baseURL: `${API_URL}/docs`,
});

docsAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const uploadDocument = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await docsAPI.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
