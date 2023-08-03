import "./styles/App.scss";
import { Router, RouterProvider } from "@tanstack/router";
import { routeTree } from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";

export default function App() {
  const router = new Router({ routeTree });
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 5 * 60 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  );
}
