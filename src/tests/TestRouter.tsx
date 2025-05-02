import {
  Route,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useMemo } from "react";

/**
 * Test router provider for testing components that use the router.
 */
export function TestRouter(props: React.PropsWithChildren) {
  const rootRoute = createRootRoute({
    component: () => props.children,
  });

  const router = useMemo(
    () =>
      createRouter({
        routeTree: rootRoute.addChildren([
          createRoute({
            path: "*",
            component: () => props.children,
            getParentRoute: () => rootRoute,
          }),
        ]),
      }),
    [props.children, rootRoute],
  );

  return <RouterProvider router={router} />;
}
