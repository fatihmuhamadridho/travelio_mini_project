import { RootRoute, Route } from "@tanstack/router";
import HomePage from "../pages/HomePage";
import BooksPage from "../pages/BooksPage";

const rootRoute = new RootRoute();
const homePageRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const booksPageRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/books",
  component: BooksPage,
});
export const routeTree = rootRoute.addChildren([
  homePageRoute,
  booksPageRoute,
]);
