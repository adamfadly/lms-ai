"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar flex-col">
      <div className="flex items-center justify-between w-full">
        <Link href="/">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <Image src="/images/logo.png" alt="logo" width={90} height={90} />
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4">
          <NavItems />
          <ThemeToggle />
          <SignedOut>
            <SignInButton>
              <button className="btn-signin">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="w-9 h-9 rounded-lg bg-secondary/60 hover:bg-accent/30 transition-colors duration-200 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="flex md:hidden flex-col gap-2 w-full pt-4 pb-2 border-t border-border/50 mt-4">
          <NavItems mobile onNavigate={() => setMobileOpen(false)} />
          <SignedOut>
            <SignInButton>
              <button className="btn-signin w-full justify-center mt-2">Sign In</button>
            </SignInButton>
          </SignedOut>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
