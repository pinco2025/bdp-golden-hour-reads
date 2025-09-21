import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
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

const FeaturedBooksCarousel: React.FC<FeaturedBooksCarouselProps> = ({ books, autoScroll = true }) => {

  // Duplicate the books for infinite effect
  const infiniteBooks = [...books, ...books];
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const speed = 60; // px per second

  // Measure card and container width
  useEffect(() => {
    if (containerRef.current) {
      const card = containerRef.current.querySelector('.carousel-card') as HTMLElement;
      if (card) setCardWidth(card.offsetWidth + 32); // 32px gap-8
      setContainerWidth(containerRef.current.scrollWidth / 2);
    }
  }, [books.length]);

  // Framer Motion-powered infinite, fluid auto-scroll effect and button scroll
  const [x, setX] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => { controls.set({ x }); }, [x, controls]);

  useEffect(() => {
    if (!autoScroll || !containerWidth) return;
    let animationFrame: number;
    let start: number | null = null;
    // Calculate offset so animation resumes from current x
    let offset = -x;
    function animateFrame(ts: number) {
      if (paused) return;
      if (start === null) start = ts;
      const elapsed = ts - start;
      let next = -((elapsed / 1000) * speed + offset) % containerWidth;
      setX(next);
      controls.set({ x: next });
      animationFrame = requestAnimationFrame(animateFrame);
    }
    animationFrame = requestAnimationFrame(animateFrame);
    return () => cancelAnimationFrame(animationFrame);
  }, [autoScroll, containerWidth, controls, speed, paused]);

  // Button scroll: animate x by cardWidth, wrap for infinite effect
  const scroll = (dir: "left" | "right") => {
    if (!containerWidth || !cardWidth) return;
    let next = x + (dir === "left" ? cardWidth : -cardWidth);
    // Wrap
    if (next < -containerWidth) next += containerWidth;
    if (next > 0) next -= containerWidth;
    setX(next);
    controls.start({ x: next, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } });
  };




  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="overflow-hidden pb-4 px-1 md:px-8"
        tabIndex={0}
        aria-label="Featured books carousel"
        style={{ width: '100%' }}
      >
        <motion.div
          className="flex gap-8"
          style={{ x: 0 }}
          animate={controls}
          custom={{ x: 0 }}
        >
          {infiniteBooks.map((book, idx) => (
            <Card
              key={idx}
              className="carousel-card min-w-[240px] max-w-[260px] md:min-w-[260px] md:max-w-[280px] flex-shrink-0 snap-center bg-white/80 backdrop-blur-md shadow-lg border-0 transition-transform hover:-translate-y-2 hover:shadow-xl duration-300"
              tabIndex={0}
              aria-label={`${book.title} by ${book.author}`}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
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
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedBooksCarousel;
