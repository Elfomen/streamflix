import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const footerLinks = [
  ["Audio Description", "Help Center", "Gift Cards", "Media Center"],
  ["Investor Relations", "Jobs", "Terms of Use", "Privacy"],
  [
    "Legal Notices",
    "Cookie Preferences",
    "Corporate Information",
    "Contact Us",
  ],
];

export function Footer() {
  return (
    <footer className="bg-background text-muted-foreground py-12 px-4 md:px-8 lg:px-12 mt-12">
      <div className="max-w-6xl mx-auto">
        {/* Social Links */}
        <div className="flex gap-6 mb-6">
          <a
            href="#"
            className="hover:text-foreground transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="hover:text-foreground transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="hover:text-foreground transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="hover:text-foreground transition-colors"
            aria-label="YouTube"
          >
            <Youtube className="h-6 w-6" />
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {footerLinks.flat().map((link) => (
            <Link key={link} href="#" className="text-xs hover:underline">
              {link}
            </Link>
          ))}
        </div>

        {/* Service Code Button */}
        <button className="border border-muted-foreground px-2 py-1 text-xs mb-6 hover:text-foreground transition-colors">
          Service Code
        </button>

        {/* Copyright */}
        <p className="text-xs">
          &copy; {new Date().getFullYear()} StreamFlix, Inc.
        </p>
      </div>
    </footer>
  );
}
