import React from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, ShoppingBag } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Books", href: "#featured-books" },
  { label: "Genres", href: "#genres" },
  { label: "New Releases", href: "#new-releases" },
  { label: "About", href: "#about" },
];

const socialLinks = [
  { href: "https://facebook.com/bdppublications", icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
  { href: "https://instagram.com/bdppublications", icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
  { href: "https://gumroad.com/bdppublications", icon: <ShoppingBag className="w-5 h-5" />, label: "Gumroad" },
];

const Header: React.FC = () => (
  <header className="w-full fixed top-0 left-0 z-30 bg-white/50 backdrop-blur-md shadow-sm transition-all supports-backdrop-blur:bg-white/30">
    <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        <img
          src="/logo/bdploog.png"
          alt="BDP Publications Logo"
          className="w-10 h-10 rounded-full object-cover border border-white shadow"
        />
        <span className="font-serif text-xl font-bold tracking-tight drop-shadow-sm" style={{ color: '#068f4d' }}>
          BDP Publications
        </span>
      </div>
      <ul className="hidden md:flex gap-6 text-base font-medium text-gray-700">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="hover:text-primary transition-colors px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="p-2 rounded-full hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </nav>
  </header>
);

export default Header;
