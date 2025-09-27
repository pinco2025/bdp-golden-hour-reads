import React, { useRef, useEffect } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react"
import { KeenSliderPlugin } from "keen-slider/react"



type Book = {
  title: string;
  desc: string;
  img: string;
  link: string;
};

type Props = {
  books: Book[];
  focusedIdx: number;
  setFocusedIdx: (idx: number) => void;
};

export default function InfiniteCarousel({ books, focusedIdx, setFocusedIdx }: Props) {
  // Keen-slider official autoplay plugin
  function autoplayPlugin(slider) {
    let timeout;
    let mouseOver = false;
    function clearNextTimeout() {
      clearTimeout(timeout);
    }
    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        slider.next();
      }, 2000);
    }
    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });
    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  }

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    slides: {
      perView: 4,
      spacing: 24,
    },
    drag: false,
  }, [autoplayPlugin]);

  return (
  <div className="relative min-h-[420px]">
      <button
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-gray-700 text-white rounded-full p-1 hover:bg-gray-600 transition focus:outline-none border border-gray-500"
        onClick={() => slider?.current?.prev()}
        aria-label="Scroll Left"
        style={{outline: 'none'}}
      >
        <span className="text-xl">&#8592;</span>
      </button>
      <button
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-gray-700 text-white rounded-full p-1 hover:bg-gray-600 transition focus:outline-none border border-gray-500"
        onClick={() => slider?.current?.next()}
        aria-label="Scroll Right"
        style={{outline: 'none'}}
      >
        <span className="text-xl">&#8594;</span>
      </button>
  <div ref={sliderRef} className="keen-slider pb-8 min-h-[380px]">
        {books.map((book, idx) => (
          <div key={book.title + idx} className="keen-slider__slide flex-shrink-0 flex flex-col items-center justify-center w-[280px]" onClick={() => setFocusedIdx(idx)}>
            <a
              href={book.link || "https://example.com/buy-book"}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-primary/30 flex items-center justify-center p-2 h-[400px] w-[280px] overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                <img src={book.img} alt={book.title} className="w-[280px] h-[400px] object-cover rounded-2xl" />
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
