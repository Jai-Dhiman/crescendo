import axios from "axios";
import { AuthResponse } from "@/types/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = {
  me: async (): Promise<AuthResponse> => {
    try {
      const { data } = await api.get("/auth/me");
      return data;
    } catch (error) {
      return { authenticated: false };
    }
  },

  logout: async () => {
    const { data } = await api.post("/auth/logout");
    return data;
  },
};
