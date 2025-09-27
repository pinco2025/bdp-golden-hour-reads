import React from "react";
import { ShoppingBag, Instagram, ExternalLink } from "lucide-react";

const links = [
  {
    href: "https://gumroad.com/bdpbooksnguides",
    alt: "Gumroad",
    icon: <ShoppingBag className="h-7 w-7 text-primary" />
  },
  {
    href: "https://instagram.com/bdppublications",
    alt: "Instagram",
    icon: <Instagram className="h-7 w-7 text-pink-500" />
  },
  {
    href: "https://amazon.com/kdp",
    alt: "Amazon KDP",
    icon: <ExternalLink className="h-7 w-7 text-yellow-500" />
  }
];

export default function FooterLinks() {
  return (
    <div className="flex gap-4 items-center justify-center">
      {links.map(link => (
        <a key={link.alt} href={link.href} target="_blank" rel="noopener" className="hover:scale-110 transition-transform" aria-label={link.alt}>
          {link.icon}
        </a>
      ))}
    </div>
  );
}
