import MenuNavigation from "@/components/menuNavigation";
import Index from "@/page";
import Register from "@/page/Register";
import Post from "@/page/post";
import { Router } from "@tanstack/react-router";
import { RootRoute, Outlet, Route } from "@tanstack/react-router";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const rootRoute = new RootRoute({
    component: () => (
      <>
        <MenuNavigation />
        <hr />
        <Outlet />
        {/* <TanStackRouterDevtools initialIsOpen={false} /> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    ),
  });
  const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Index,
  });
  
  const aboutRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/register",
    component: Register,
  });
  export const PostIndex = new Route({
    getParentRoute: () => rootRoute,
    path: "/post/$postId",
    component: Post,
  });
  const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, PostIndex]);
  
  export const router = new Router({ routeTree, defaultPreload: "intent" });
  
  declare module "@tanstack/react-router" {
    interface Register {
      router: typeof router;
    }
  }