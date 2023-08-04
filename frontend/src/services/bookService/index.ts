import useQuery from "../../hooks/useQuery";
import { BookService } from "./book";

export const useGetListBooks = (params: { q?: string; [key: string]: any }) => {
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

export const useGetDetailBook = (query: string) => {
  const { data, status, isFetching } = useQuery({
    key: ["detailBook", query],
    fetchAction: async () => {
      const response = await BookService.getOneBook(query);
      return response;
    },
    select: (data: any) => {
      return data.data;
    },
  });

  return { data, status, isFetching };
};
