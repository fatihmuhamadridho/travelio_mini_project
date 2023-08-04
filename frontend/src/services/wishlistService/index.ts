import useQuery from "../../hooks/useQuery";
import { WishlistService } from "./wishlist";

export const useGetListWishlist = (params: { page: number; limit: number }) => {
  const { data, status, isFetching } = useQuery({
    key: ["getListWishlist", params],
    fetchAction: async () => {
      const response = await WishlistService.getAllWishlist(params);
      return response;
    },
    select: (data: any) => {
      return data.data.data;
    },
  });

  return { data, status, isFetching };
};
