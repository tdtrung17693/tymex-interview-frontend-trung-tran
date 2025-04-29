import type { FileRoutesByFullPath } from "@/routeTree.gen";

interface NavigationItem {
  href: keyof FileRoutesByFullPath;
  label: string;
}

export const navigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Marketplace",
    href: "/marketplace",
  },
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Our Teams",
    href: "/our-teams",
  },
  {
    label: "Roadmap",
    href: "/roadmap",
  },
  {
    label: "Whitepaper",
    href: "/whitepaper",
  },
];
