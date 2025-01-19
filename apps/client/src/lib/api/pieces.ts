import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import type { CreatePiece } from "@crescendo/validation/src/api";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8787",
  withCredentials: true,
});

const PIECES_BASE_URL = "/api/pieces";

export function GetPieces<T>() {
  const { getToken } = useAuth();

  return useQuery<T>({
    queryKey: ["pieces"],
    queryFn: async () => {
      const token = await getToken();
      const response = await fetch(PIECES_BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
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
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      const response = await fetch(`${PIECES_BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete piece");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pieces"] });
    },
  });
}
