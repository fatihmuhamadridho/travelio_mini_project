import useQuery from "../../hooks/useQuery";
import { BookService } from "./book";

export const useGetListBooks = (params: { q: string }) => {
  const { data, status, isFetching } = useQuery({
    key: ["listBooks", params],
    fetchAction: async () => {
      const response = await BookService.getAllBooks(params);
      return response;
    },
    select: (data: any) => {
      return data.data.items;
    },
  });

  return { data, status, isFetching };
};
