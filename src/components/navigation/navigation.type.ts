import type { FileRoutesByFullPath } from "@/routeTree.gen";

export interface NavigationItem {
  href: keyof FileRoutesByFullPath;
  label: string;
}
