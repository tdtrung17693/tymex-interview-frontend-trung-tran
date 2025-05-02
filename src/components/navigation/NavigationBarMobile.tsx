import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Drawer, DrawerContent } from "../ui/drawer";
import { type NavgationbarProps } from "./NavigationBar";

export default function NavigationBarMobile(props: NavgationbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative mr-auto h-full w-full xl:hidden">
      <Menu
        className="absolute top-1/2 left-6 size-6 -translate-y-1/2 text-white"
        onClick={() => setIsOpen(true)}
      />
      <Drawer
        open={isOpen}
        onOpenChange={setIsOpen}
        shouldScaleBackground={true}
      >
        <DrawerContent>
          <div className="navbar-links font-squada-one flex flex-col items-center gap-14 py-10 text-lg leading-5 font-bold tracking-wide text-white uppercase [&>a]:inline-block">
            {props.navigation.map((item) => (
              <Link key={item.href} to={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
