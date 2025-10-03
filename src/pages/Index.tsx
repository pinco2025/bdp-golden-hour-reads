import InfiniteCarousel from "../components/InfiniteCarousel";
import React, { useState } from "react";
import FooterLinks from "../components/FooterLinks";
import { Helmet } from "react-helmet";

const books = [
  {
    title: "The Burnout Reset: A practical 30-day plan",
    desc: "A practical 30-day plan to reclaim your energy by implementing science-backed techniques for setting boundaries, practicing digital minimalism, and ending the stress cycle.",
    img: "https://public-files.gumroad.com/4lxnhpunk3mb9w8kw0yg2npxqrkr",
    link: "https://rzp.io/rzp/burnout-reset"
  },
  {
    title: "Rent-a-Boyfriend (Part 1)",
    desc: "She needed a plus-one. He needed a paycheck. What they didn’t expect was falling for each other, while barely affording rent.",
    img: "https://public-files.gumroad.com/3zd6zyfgwh9bpwf2rff260zdj6nu",
    link: "https://example.com/buy-book"
  },
  {
    title: "Micro-Habits for a Mega-Life",
    desc: "Big changes don’t require massive effort. This guide shows you how to stack tiny, actionable habits onto your existing routine and watch your life transform.",
    img: "https://public-files.gumroad.com/wfbg6epu5m29ty4hgwgw72ya8316",
    link: "https://example.com/buy-book"
  },
  {
    title: "The Last Spell of Summer",
    desc: "She’s a weary witch with nothing left to give. He’s a gruff sheriff keeping his town in check. Neither expected that magic, or love, would come knocking again.",
    img: "https://public-files.gumroad.com/pclfn4jk5meync5pvlxqmkg8txbb",
    link: "https://example.com/buy-book"
  }
];

const Index = () => {
  const [focusedIdx, setFocusedIdx] = useState(0);
  const focusedBook = books[focusedIdx];
  return (
    <>
      <Helmet>
        <title>BDP Publications</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <body className="dark" />
      </Helmet>
  <div className="min-h-screen flex flex-col bg-black font-serif text-gray-200">
  {/* Header */}
  <header className="flex items-center justify-between border-b border-gray-800 px-10 py-4 shadow-sm bg-black">
          <div className="flex items-center gap-3">
            <img src="/logo/bdploog.png" alt="BDP Publications Logo" className="h-10 w-10 rounded-full shadow-lg" />
            <h2 className="text-2xl font-extrabold tracking-wide text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>BDP Publications</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-base font-semibold">
            <a className="text-gray-300 hover:text-primary transition-colors" href="#">Home</a>
            <a className="text-gray-300 hover:text-primary transition-colors" href="#featured">Books</a>
            <a className="text-gray-300 hover:text-primary transition-colors" href="#about">About</a>
          </nav>
        </header>
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative bg-cover bg-center py-32 px-4" style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.9) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDTyykrwEXk7tlHEAUc9G4AoZxB9JoIzzdv4N_d5qd3tfRh9siCBt6N-FmwPSPkEBB1t5FKqXrnnmcpKw3rnSfvy9DejtVOdvRbTcClY8ixtU0_TuBo89I_Mj5JuRgzE-O-nqqM7K1omXXfR05LajoB7hGLJ5HirlsMKJa4Z05bxTL27NVJ6mmFbmt-yTFlEE5BzRfXdY9Is2zYU8v8ty58BQ_B9d0jGQQYxcp1jG2-FnHxX4fH6-sqCeZAvzs5JbUToEMHnuGIPD7F')", backgroundColor: "#000"}}>
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-4">Reclaim your energy in 30 days</h1>
              <p className="text-lg md:text-xl font-light mb-8">Download our free guide and start today.</p>
                <a
                  href="https://bdpbooksnguides.gumroad.com/l/burnout-reset-free-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-primary text-white px-6 py-4 rounded-lg text-lg font-bold hover:bg-primary/90 transition-all transform hover:scale-105 max-w-[220px] mx-auto text-center"
                >
                  Get Your Energy
                </a>
            </div>
          </section>
          {/* Carousel Section */}
          <section className="py-20 bg-background-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-black rounded-2xl">
              {/* Focused Book Section */}
              <div className="mb-10 flex justify-center">
                <div className="flex w-full max-w-5xl min-h-[420px] bg-black rounded-3xl shadow-2xl border border-gray-800 overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_40px_10px_rgba(72,220,140,0.18)]">
                  {/* Book Cover Left */}
                  <div className="flex-shrink-0 flex items-center justify-center p-10 bg-white dark:bg-gray-900">
                    <img src={focusedBook.img} alt={focusedBook.title} className="w-[280px] h-[400px] object-cover rounded-2xl shadow-2xl border border-primary/30" />
                  </div>
                  {/* Book Info Right - more flexible for extra info */}
                  <div className="flex flex-col justify-center px-12 py-10 flex-1 gap-6">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white drop-shadow-lg w-full max-w-2xl text-center font-serif" style={{fontFamily: 'Georgia, Times, Times New Roman, serif'}}>{focusedBook.title}</h3>
                    <p className="text-xl md:text-2xl text-gray-400 mb-4 font-normal leading-relaxed font-serif" style={{fontFamily: 'Georgia, Times, Times New Roman, serif'}}>{focusedBook.desc}</p>
                    {/* Extra info placeholder for future integration */}
                    <div className="flex flex-col gap-2">
                      {/* Example: Author, Genre, Year, etc. */}
                      {/* <span className="text-base text-gray-300">Author: John Doe</span> */}
                      {/* <span className="text-base text-gray-300">Genre: Fantasy</span> */}
                    </div>
                    <a
                      href={focusedBook.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-primary text-white font-bold text-base px-4 py-3 rounded-full shadow-lg hover:bg-primary/90 transition-transform duration-200 border-2 border-primary mt-14 min-w-[120px] max-w-[160px] mx-auto text-center"
                      style={{letterSpacing: '0.05em'}}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-center mb-12 text-white">Featured Books</h2>
              <InfiniteCarousel books={books} focusedIdx={focusedIdx} setFocusedIdx={setFocusedIdx} />
            </div>
          </section>
        </main>
  {/* Footer */}
  <footer className="bg-black py-8 px-10">
          <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
            <p>© 2025 BDP Publications. All Rights Reserved.</p>
            <FooterLinks />
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;