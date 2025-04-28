import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "@/components/header/Header";

export const Route = createRootRoute({
  component: () => (
    <div className="pt-[var(--height-navbar)]">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
