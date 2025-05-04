import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import type { NavigationItem } from "./navigation.type";
import NavigationBarMobile from "./NavigationBarMobile";
export interface NavgationbarProps {
  className?: string;
  navigation: NavigationItem[];
}

export default function NavigationBar(props: NavgationbarProps) {
  const [activeOffset, setActiveOffset] = useState(-1);
  const router = useRouterState();

  useLayoutEffect(() => {
    setTimeout(() => {
      const activeLinkElement = document.querySelector<HTMLAnchorElement>(
        `.navbar-links a.active`,
      );
      setActiveOffset(activeLinkElement?.offsetLeft ?? -1);
    }, 50);
  }, [router.location.pathname]);

  return (
    <header
      className={cn(
        "h-navbar z-10 flex w-full items-center justify-center backdrop-blur-sm lg:bg-black/50",
        props.className,
      )}
    >
      <div className="relative flex h-full w-full justify-between xl:h-auto">
        <NavigationBarMobile {...props} />
        <div className="mx-auto flex w-full max-w-7xl items-center pr-6 xl:pl-0">
          <div
            className={cn(
              "navbar-links font-squada-one hidden items-center gap-14 text-lg leading-5 font-bold tracking-wide text-white uppercase xl:flex [&>a]:inline-block",
              activeOffset === -1 && "hidden",
            )}
            style={
              {
                "--link-active-offset": `${activeOffset}px`,
                "--link-active-indicator-display":
                  activeOffset === -1 ? "none" : "block",
              } as React.CSSProperties
            }
          >
            {props.navigation.map((item) => (
              <Link key={item.href} to={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-10">
            <Button className="rounded-md">Connect Wallet</Button>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
