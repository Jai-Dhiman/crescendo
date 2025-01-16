import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
});

type CreatePieceInput = {
  title: string;
  file: File;
};

const PIECES_BASE_URL = "/api/pieces";

export function GetPieces<T>() {
  return useQuery<T>({
    queryKey: ["pieces"],
    queryFn: async () => {
      const response = await fetch(PIECES_BASE_URL);
      const data = await response.json();
      return data;
    },
  });
}

export function GetPieceById<T>(id: string) {
  return useQuery<T>({
    queryKey: ["pieces", id],
    queryFn: async () => {
      const response = await fetch(`${PIECES_BASE_URL}/${id}`);
      const data = await response.json();
      return data;
    },
    enabled: !!id,
  });
}

export function CreatePiece<T>() {
  const queryClient = useQueryClient();
  return useMutation<T, Error, CreatePieceInput>({
    mutationFn: async ({ title, file }) => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("pdf", file);

      const { data } = await api.post(PIECES_BASE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
