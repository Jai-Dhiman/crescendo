import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import type { CreatePiece } from "@crescendo/validation/src/schema";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8787",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const PIECES_BASE_URL = "/api/pieces";

export function GetPieces<T>() {
  const { getToken } = useAuth();

  return useQuery<T>({
    queryKey: ["pieces"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("No auth token available");

      try {
        const response = await api.get(PIECES_BASE_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("GET request failed:", error);
        throw error;
      }
    },
    retry: 2,
    retryDelay: 1000,
  });
}

export function GetPieceById<T>(id: string) {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["piece", id],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("No auth token available");
      try {
        const response = await api.get(`${PIECES_BASE_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data as T;
      } catch (error) {
        console.error("GET request failed:", error);
        throw error;
      }
    },
  });
}

export function GetPiecePdf(id: string) {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["piece-pdf", id],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("No auth token available");

      try {
        const response = await api.get(`${PIECES_BASE_URL}/${id}/pdf`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        });

        return URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      } catch (error) {
        console.error("GET PDF request failed:", error);
        throw error;
      }
    },
  });
}

export function CreatePiece<T>() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation<T, Error, CreatePiece>({
    mutationFn: async ({ title, artist, file }) => {
      const token = await getToken();
      const formData = new FormData();
      formData.append("title", title);
      if (artist) formData.append("artist", artist);
      formData.append("pdf", file);

      const { data } = await axios.post(PIECES_BASE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pieces"] });
    },
  });
}

export function DeletePiece() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const token = await getToken();
      if (!token) throw new Error("No auth token available");

      try {
        await api.delete(`${PIECES_BASE_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("DELETE request failed:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pieces"] });
    },
  });
}
