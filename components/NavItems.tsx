"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "My Journey", href: "my-journey" },
];

interface NavItemsProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

const NavItems = ({ mobile, onNavigate }: NavItemsProps) => {
  const pathname = usePathname();

  return (
    <nav className={cn("flex gap-2", mobile ? "flex-col w-full" : "items-center")}>
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={label}
          onClick={onNavigate}
          className={cn(
            "px-4 py-2 rounded-lg transition-all duration-200 font-medium",
            mobile && "w-full text-center py-3",
            pathname === href ? "bg-accent text-accent-foreground shadow-sm" : "text-foreground hover:bg-secondary/60",
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
