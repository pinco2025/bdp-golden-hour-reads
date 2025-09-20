import React, { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Facebook, ShoppingBag, ExternalLink } from "lucide-react";

interface Book {
  title: string;
  author: string;
  cover: string;
  description: string;
  price: string;
  platforms: string[];
}

export interface FeaturedBooksCarouselProps {
  books: Book[];
  autoScroll?: boolean;
}
const FeaturedBooksCarousel: React.FC<FeaturedBooksCarouselProps> = ({ books, autoScroll }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: dir === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Auto-scroll effect
  React.useEffect(() => {
    if (!autoScroll || !scrollRef.current) return;
    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // If at end, scroll back to start
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll("right");
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [autoScroll]);

  return (
    <div className="relative">
      <button
        aria-label="Scroll left"
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-primary/20 text-primary rounded-full shadow p-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => scroll("left")}
        type="button"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar px-1 md:px-8"
        tabIndex={0}
        aria-label="Featured books carousel"
      >
        {books.map((book, idx) => (
          <Card
            key={idx}
            className="min-w-[240px] max-w-[260px] md:min-w-[260px] md:max-w-[280px] flex-shrink-0 snap-center bg-white/80 backdrop-blur-md shadow-lg border-0 transition-transform hover:-translate-y-2 hover:shadow-xl duration-300"
            tabIndex={0}
            aria-label={`${book.title} by ${book.author}`}
          >
            <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
              <img
                src={book.cover}
                alt={`${book.title} book cover`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-bold text-lg text-primary" style={{ fontFamily: 'Playfair Display, serif' }}>{book.title}</h3>
              <p className="text-xs text-muted-foreground mb-1">by {book.author}</p>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{book.description}</p>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-base font-bold text-primary">{book.price}</span>
                <div className="flex gap-1">
                  {book.platforms.includes('gumroad') && (
                    <a href="https://gumroad.com/bdppublications" target="_blank" rel="noopener noreferrer" aria-label="Gumroad">
                      <ShoppingBag className="w-4 h-4 text-primary" />
                    </a>
                  )}
                  {book.platforms.includes('facebook') && (
                    <a href="https://facebook.com/bdppublications" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <Facebook className="w-4 h-4 text-primary" />
                    </a>
                  )}
                  {book.platforms.includes('pinterest') && (
                    <a href="https://pinterest.com/bdppublications" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                      <ExternalLink className="w-4 h-4 text-primary" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <button
        aria-label="Scroll right"
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-primary/20 text-primary rounded-full shadow p-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => scroll("right")}
        type="button"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FeaturedBooksCarousel;
