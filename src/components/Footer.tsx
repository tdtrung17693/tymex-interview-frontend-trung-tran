import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MessageSquareText, Phone, Copyright } from "lucide-react";
const FOOTER_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About us",
    href: "/about-us",
  },
  {
    label: "Our teams",
    href: "/our-teams",
  },
  {
    label: "Whitepaper",
    href: "/whitepaper",
  },
  {
    label: "Marketplace",
    href: "/marketplace",
  },
  {
    label: "Roadmap",
    href: "/roadmap",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "News",
    href: "/news",
  },
  {
    label: "Community",
    href: "/community",
  },
];

const CONTACT_INFO = {
  mobile: "+123 456 7890",
  email: "contact@example.com",
};
export default function Footer() {
  return (
    <div className="pt-20 pb-20 lg:pb-52">
      <div className="container mx-auto flex flex-col gap-10 font-medium lg:flex-row lg:justify-between">
        <div>
          <div className="font-squada-one mb-8 text-xl font-bold uppercase">
            Navigation
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-3 lg:grid-cols-3">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} to={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="font-squada-one mb-8 text-xl font-bold uppercase">
            Contact Us
          </div>
          <div className="mb-8 flex items-center gap-2">
            <Phone className="size-4" />
            {CONTACT_INFO.mobile}
          </div>
          <div className="flex items-center gap-2">
            <MessageSquareText className="size-4" />
            {CONTACT_INFO.email}
          </div>
        </div>
        <div className="basis-2/6">
          <div className="font-squada-one mb-8 text-xl font-bold uppercase">
            Subscribe to receive own latest update
          </div>
          <div className="flex items-stretch gap-4">
            <Input type="email" placeholder="Enter your email" />
            <Button className="h-11">Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="container mt-15 flex items-center gap-2 border-t border-white/20 pt-10">
        <Copyright className="size-4" />
        <span>2023 Tyme - Edit. All Rights reserved.</span>
      </div>
    </div>
  );
}
