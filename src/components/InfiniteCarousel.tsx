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
          <div key={book.title + idx} className="keen-slider__slide flex-shrink-0 w-[220px]" onClick={() => setFocusedIdx(idx)}>
            <a
              href={book.link || "https://example.com/buy-book"}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border-2 border-gray-300 dark:border-gray-700 overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 h-[340px] flex flex-col cursor-pointer hover:ring-2 hover:ring-primary">
                <div className="w-full h-[260px] bg-cover bg-center" style={{backgroundImage: `url('${book.img}')`}}></div>
                <div className="p-4 flex-1 flex flex-col justify-end">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">{book.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{book.desc}</p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
