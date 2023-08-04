import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
});

export type postWishlistProps = {
  volumeId: string;
  title: string;
  subtitle: string;
  authors: object;
  thumbnail: string;
};

export class WishlistService {
  static ApiEndpoint = {
    wishlist: "/wishlist",
  };

  static getAllWishlist(params: { page: number; limit: number }) {
    return apiClient.get(this.ApiEndpoint.wishlist, { params });
  }

  static postWishlist(payload: postWishlistProps) {
    return apiClient.post(this.ApiEndpoint.wishlist, payload);
  }
}
