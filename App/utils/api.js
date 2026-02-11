// utils/api.js
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your API URL
const API_BASE_URL = "https://afrivision-backend.onrender.com/api";

export const api = {
  // GET request
  async get(endpoint) {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  },

  // POST request
  async post(endpoint, data) {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  },

  // PUT request
  async put(endpoint, data) {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  },

  // DELETE request
  async delete(endpoint) {
    const token = await AsyncStorage.getItem("userToken");

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  },
};

// Helper function to get user profile
export const getUserProfile = async () => {
  try {
    const data = await api.get("/users/me");
    return data.profile;
  } catch (error) {
    console.error("Failed to get user profile:", error);
    throw error;
  }
};
