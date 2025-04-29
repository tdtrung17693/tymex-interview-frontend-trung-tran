import { cn } from "@/lib/utils";
import { navigation } from "./navigation.constant";
import { Link, useRouterState } from "@tanstack/react-router";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
interface NavgationbarProps {
  className?: string;
}

export default function NavigationBar(props: NavgationbarProps) {
  const router = useRouterState();
  const [activeOffset, setActiveOffset] = useState(-1);

  useLayoutEffect(() => {
    setTimeout(() => {
      const activeLinkElement = document.querySelector<HTMLAnchorElement>(
        `.navbar-links a[href="${router.location.pathname}"]`,
      );
      const boundingRect = activeLinkElement?.getBoundingClientRect();
      setActiveOffset(activeLinkElement?.offsetLeft ?? 0);
      console.log(activeLinkElement?.offsetLeft, boundingRect?.left);
    }, 50);
  }, [router.location.pathname]);

  return (
    <header
      className={cn(
        "h-navbar flex w-full items-center justify-center bg-black/50 backdrop-blur-sm",
        props.className,
      )}
    >
      <div className="relative w-full">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <div
            className="navbar-links font-squada-one flex items-center gap-14 text-lg leading-5 font-bold tracking-wide text-white uppercase [&>a]:inline-block"
            style={
              {
                "--link-active-offset": `${activeOffset}px`,
                "--link-active-indicator-display":
                  activeOffset === -1 ? "none" : "block",
              } as React.CSSProperties
            }
          >
            {navigation.map((item) => (
              <Link key={item.href} to={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-10">
            <Button className="rounded-md">Connect Wallet</Button>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
