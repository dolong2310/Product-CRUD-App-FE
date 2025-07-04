"use client";

import Link from "next/link";
import { ModeToggle } from "../ModeToggle";
import HeaderAction from "./HeaderAction";
import { twMerge } from "tailwind-merge";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const navRoutes = [
  { href: "/", label: "Home", customClassName: "text-2xl font-bold" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative container flex items-center justify-between py-4">
      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex items-center">
          {navRoutes.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                className={twMerge("py-2 px-4", route.customClassName)}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Right Actions */}
      <div className="hidden md:flex items-center gap-4">
        <HeaderAction />
        <ModeToggle />
      </div>

      {/* Mobile Logo/Home Link */}
      <div className="md:hidden">
        <Link href="/" className="text-2xl font-bold py-2 px-4">
          Home
        </Link>
      </div>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden flex items-center gap-2">
        <ModeToggle />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="p-2"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b shadow-lg md:hidden z-50">
          <div className="container py-4">
            {/* Mobile Navigation */}
            <nav className="mb-4">
              <ul className="space-y-2">
                {navRoutes.map((route) => (
                  <li key={route.href}>
                    <Link
                      href={route.href}
                      className={twMerge(
                        "block py-3 px-4 hover:bg-accent rounded-md transition-colors",
                        route.customClassName
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {route.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Actions */}
            <div className="pt-4 border-t">
              <HeaderAction />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
