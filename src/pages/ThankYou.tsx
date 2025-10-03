import books from "../data/books";
import { useLocation } from "react-router-dom";
import FooterLinks from "../components/FooterLinks";

const SUPPORT_EMAIL = "bdp.innovate@gmail.com";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ThankYou: React.FC = () => {
  const query = useQuery();
  const bookId = query.get("book");
  const purchasedBook = books.find((b) => b.id === bookId);
  const recommendedBooks = books.filter((b) => b.id !== bookId);

  return (
    <div
      className="min-h-screen flex flex-col font-serif text-gray-200"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat fixed`,
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-800 px-10 py-4 shadow-sm bg-black/80">
        <div className="flex items-center gap-3">
          <img src="/logo/bdploog.png" alt="BDP Publications Logo" className="h-10 w-10 rounded-full shadow-lg" />
          <h2 className="text-2xl font-extrabold tracking-wide text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>BDP Publications</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-base font-semibold">
          <a className="text-gray-300 hover:text-primary transition-colors" href="/">Home</a>
          <a className="text-gray-300 hover:text-primary transition-colors" href="/">Books</a>
          <a className="text-gray-300 hover:text-primary transition-colors" href="/">About</a>
        </nav>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-20 w-full">
        <section className="w-full max-w-3xl bg-black/80 rounded-3xl shadow-2xl border border-gray-800 p-12 mb-12 text-center mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Thank You for Your Purchase!</h1>
          {purchasedBook ? (
            <>
              <p className="text-2xl mb-4 text-gray-200">
                Welcome, and thank you for purchasing <span className="font-semibold text-primary">{purchasedBook.title}</span>!
              </p>
              <p className="mb-8 text-lg text-gray-400">
                Your copy of <span className="font-semibold">{purchasedBook.title}</span> will be mailed to you shortly.
              </p>
              <div className="flex flex-col items-center mb-8">
                <img
                  src={purchasedBook.img}
                  alt={purchasedBook.title}
                  className="w-56 h-80 object-cover rounded-2xl shadow border border-primary/30 mb-2"
                />
              </div>
            </>
          ) : (
            <p className="text-2xl mb-8 text-destructive">
              Sorry, we couldn't find the book you purchased.
            </p>
          )}
          <p className="text-base text-gray-400">
            For any issues, contact us at{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="underline text-primary">
              {SUPPORT_EMAIL}
            </a>
          </p>
        </section>
        <section className="w-full max-w-5xl bg-black/70 rounded-3xl p-10 border border-gray-800 mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center text-white">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {recommendedBooks.length === 0 ? (
              <div className="text-center text-gray-500 col-span-2">No other books to recommend right now.</div>
            ) : (
              recommendedBooks.map((book) => (
                <a
                  href={book.link}
                  key={book.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center bg-black/80 rounded-2xl p-6 border border-gray-800 hover:shadow-xl transition min-h-[420px]"
                >
                  <img
                    src={book.img}
                    alt={book.title}
                    className="w-44 h-64 object-cover rounded mb-4 border border-primary/20 shadow"
                  />
                  <div className="font-semibold text-white text-lg text-center mb-2">{book.title}</div>
                  <div className="text-sm text-gray-400 text-center">{book.desc}</div>
                </a>
              ))
            )}
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-black/80 py-8 px-10 mt-16">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>© 2025 BDP Publications. All Rights Reserved.</p>
          <FooterLinks />
        </div>
      </footer>
    </div>
  );
};

export default ThankYou;
