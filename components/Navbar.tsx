"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Bell, ChevronDown, Menu, X } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "TV Shows" },
  { href: "/browse?type=movies", label: "Movies" },
  { href: "/browse?type=new", label: "New & Popular" },
  { href: "/my-list", label: "My List" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { currentProfile, clearProfile } = useProfile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        isScrolled
          ? "bg-background"
          : "bg-gradient-to-b from-background/80 to-transparent",
      )}
    >
      <nav className="flex items-center justify-between px-4 md:px-8 lg:px-12 py-4">
        {/* Logo and Nav Links */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-primary font-bold text-2xl md:text-3xl tracking-tight"
          >
            STREAMFLIX
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <Link
            href="/search"
            className="text-foreground hover:text-muted-foreground transition-colors"
          >
            <Search className="h-5 w-5" />
          </Link>

          <button className="hidden md:block text-foreground hover:text-muted-foreground transition-colors">
            <Bell className="h-5 w-5" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2"
            >
              {currentProfile ? (
                <img
                  src={currentProfile.avatar || "/placeholder.svg"}
                  alt={currentProfile.name}
                  className="w-8 h-8 rounded object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                  U
                </div>
              )}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  isProfileMenuOpen && "rotate-180",
                )}
              />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded shadow-lg py-2">
                {currentProfile && (
                  <>
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium text-foreground">
                        {currentProfile.name}
                      </p>
                    </div>
                    <Link
                      href="/profiles"
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Switch Profiles
                    </Link>
                    <button
                      onClick={() => {
                        clearProfile();
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      Sign Out
                    </button>
                  </>
                )}
                {!currentProfile && (
                  <Link
                    href="/profiles"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Select Profile
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur border-t border-border">
          <ul className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
