import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_GOOGLE_BOOKS_API,
});

export class BookService {
  static ApiEndpoint = {
    volumes: "/volumes",
  };

  static getAllBooks(params: { q?: string; [key: string]: any }) {
    return apiClient.get(this.ApiEndpoint.volumes, { params });
  }

  static getOneBook(query: string) {
    return apiClient.get(this.ApiEndpoint.volumes + `/${query}`);
  }
}
