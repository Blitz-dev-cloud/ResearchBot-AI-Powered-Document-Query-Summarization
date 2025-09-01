import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const authAPI = axios.create({
  baseURL: `${API_URL}/auth`,
});

export const register = async (username, password) => {
  try {
    const response = await authAPI.post("/register", { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (username, password) => {
  try {
    const response = await authAPI.post("/login", { username, password });
    const { access_token } = response.data;

    localStorage.setItem("token", access_token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
};

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
