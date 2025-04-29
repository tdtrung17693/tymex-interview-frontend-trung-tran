import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import RootLayout from "@/components/RootLayout";
import NotFound from "@/components/NotFound";
import squadaOneFontUrl from "@fontsource/squada-one/files/squada-one-latin-400-normal.woff2?url";
import interFontUrl from "@fontsource/inter/files/inter-latin-400-normal.woff2?url";

export const Route = createRootRoute({
  head: () => ({
    links: [
      {
        rel: "preload",
        href: squadaOneFontUrl,
        as: "font",
      },
      {
        rel: "preload",
        href: interFontUrl,
        as: "font",
      },
    ],
  }),
  component: () => (
    <RootLayout>
      <Outlet />
      <TanStackRouterDevtools />
    </RootLayout>
  ),
  notFoundComponent: () => <NotFound />,
});
