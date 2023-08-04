import { RootRoute, Route } from "@tanstack/router";
import HomePage from "../pages/HomePage";
import BooksPage from "../pages/BooksPage";
import WishlistPage from "../pages/WishlistPage";
import DetailBookPage from "../pages/DetailBookPage";

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
const detailBookPageRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/books/$id",
  component: DetailBookPage,
});
const whishlistPageRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/wishlist",
  component: WishlistPage,
});

export const routeTree = rootRoute.addChildren([
  homePageRoute,
  booksPageRoute,
  detailBookPageRoute,
  whishlistPageRoute,
]);
