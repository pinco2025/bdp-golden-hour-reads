import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Heart, Star, ExternalLink, Facebook, ShoppingBag } from "lucide-react";

const Index = () => {
  const featuredBooks = [
    {
      title: "Morning Meditations",
      author: "Elena Rodriguez",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&crop=edges",
      description: "Daily wisdom for peaceful mornings",
      price: "$12.99",
      platforms: ["gumroad", "facebook"]
    },
    {
      title: "The Golden Path",
      author: "Marcus Chen",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&crop=edges",
      description: "A journey through self-discovery",
      price: "$15.99",
      platforms: ["gumroad", "pinterest"]
    },
    {
      title: "Sunset Stories",
      author: "Sarah Williams",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=edges",
      description: "Tales of love, loss, and hope",
      price: "$11.99",
      platforms: ["gumroad", "facebook", "pinterest"]
    },
    {
      title: "Mindful Moments",
      author: "Dr. James Foster",
      cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop&crop=edges",
      description: "Finding peace in everyday life",
      price: "$13.99",
      platforms: ["gumroad", "pinterest"]
    }
  ];

  // Enhanced smooth scroll with fallback and focus
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.tabIndex = -1;
      el.focus({ preventScroll: true });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=edges')`,
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-accent/30 to-background/60" />
        
        {/* Secondary overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-pulse">
          <BookOpen className="w-8 h-8 text-primary/30" />
        </div>
        <div className="absolute bottom-32 right-16 animate-pulse delay-700">
          <Heart className="w-6 h-6 text-accent/40" />
        </div>
        <div className="absolute top-1/3 right-20 animate-pulse delay-1000">
          <Star className="w-7 h-7 text-primary/25" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <div className="mb-8 flex justify-center">
            <img
              src="/logo/bdploog.png"
              alt="BDP Publications Logo"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-warm bg-white/80"
              style={{ aspectRatio: '1/1' }}
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight drop-shadow-lg">
            <span style={{ fontFamily: 'Playfair Display, serif' }}>
              Discover Your Next
            </span>
            <br />
            <span className="text-accent drop-shadow-lg">
              Great Read
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 literary-text max-w-2xl mx-auto drop-shadow-md">
            Welcome to BDP Publications, where every page turns into a moment of discovery. 
            Curated ebooks that inspire, educate, and transport you to new worlds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="organic-curve shadow-warm hover:shadow-glow transition-all duration-500 text-lg px-8 py-6"
              onClick={() => scrollToSection('featured-books')}
            >
              Explore Our Collection
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="organic-curve border-2 border-white/70 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white text-lg px-8 py-6"
            >
              Learn Our Story
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* Improved Scroll Indicator Arrow */}
        <button
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 focus:outline-none group"
          aria-label="Scroll to featured books"
          onClick={() => scrollToSection('featured-books')}
        >
          <span className="flex flex-col items-center">
            <svg className="w-8 h-8 text-white drop-shadow-lg animate-bounce group-hover:text-accent transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <span className="text-xs text-white/80 mt-1">Scroll</span>
          </span>
        </button>
      </section>

      {/* About Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&crop=edges')`,
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
                Where Stories Come to Life
              </h2>
              <p className="text-lg literary-text text-muted-foreground mb-6">
                At BDP Publications, we believe in the transformative power of words. Each ebook in our collection 
                is carefully selected for its ability to inspire, educate, and entertain. From personal development 
                guides to captivating fiction, we're here to be your trusted companion on life's reading journey.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Removed Premium Titles and Happy Readers section as requested */}
              </div>
            </div>
            <div className="relative overflow-hidden">
              <div className="organic-curve bg-white/80 backdrop-blur-sm p-8 shadow-warm">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=edges" 
                  alt="Cozy reading corner with books and warm lighting"
                  className="w-full h-auto rounded-lg shadow-warm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section id="featured-books" className="relative py-20 px-6 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1418065460487-3d7cc9b0c3f2?w=1920&h=1080&fit=crop&crop=edges')`,
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-secondary/60 backdrop-blur-sm" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
              Featured Collection
            </h2>
            <p className="text-xl text-muted-foreground literary-text max-w-2xl mx-auto">
              Handpicked titles that have touched hearts and changed minds. Each book is a doorway to new perspectives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book, index) => (
              <Card key={index} className="organic-curve overflow-hidden book-hover border-0 shadow-warm bg-card/80 backdrop-blur-sm">
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={book.cover} 
                    alt={`${book.title} book cover`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-card-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {book.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                  <p className="text-sm literary-text text-muted-foreground mb-4">{book.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-primary">{book.price}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {book.platforms.includes('gumroad') && (
                      <Button size="sm" className="flex-1 organic-curve" asChild>
                        <a href="https://gumroad.com/bdppublications" target="_blank" rel="noopener noreferrer" aria-label="Gumroad">
                          <ShoppingBag className="w-4 h-4 mr-1" />
                          Gumroad
                        </a>
                      </Button>
                    )}
                    {book.platforms.includes('facebook') && (
                      <Button size="sm" variant="outline" className="organic-curve border-primary/50" asChild>
                        <a href="https://facebook.com/bdppublications" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                          <Facebook className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {/* Always show Instagram button */}
                    <Button size="sm" variant="outline" className="organic-curve border-primary/50" asChild>
                      <a href="https://instagram.com/bdppublications" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
                      </a>
                    </Button>
                    {book.platforms.includes('pinterest') && (
                      <Button size="sm" variant="outline" className="organic-curve border-primary/50" asChild>
                        <a href="https://pinterest.com/bdppublications" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="organic-curve border-2 border-primary/50 hover:bg-primary/10">
              View Full Catalog
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1475924156734-496f6cac893c?w=1920&h=1080&fit=crop&crop=edges')`,
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-accent/60" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="bg-black/20 backdrop-blur-md p-12 organic-curve text-white border border-white/20 shadow-glow">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Join Our Reading Community
            </h2>
            <p className="text-xl literary-text mb-8 opacity-90">
              Be the first to discover new releases, exclusive content, and special offers. 
              Your next favorite book is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="organic-curve text-lg px-8 py-6 bg-white/90 text-primary hover:bg-white" asChild>
                <a href="https://facebook.com/bdppublications" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  Follow on Facebook
                </a>
              </Button>
              <Button size="lg" variant="secondary" className="organic-curve text-lg px-8 py-6 bg-white/90 text-primary hover:bg-white" asChild>
                <a href="https://instagram.com/bdppublications" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  Follow on Instagram
                </a>
              </Button>
              <Button size="lg" variant="secondary" className="organic-curve text-lg px-8 py-6 bg-white/90 text-primary hover:bg-white" asChild>
                <a href="https://pinterest.com/bdppublications" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                  Visit Our Pinterest
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-card/90 backdrop-blur-md py-12 px-6 border-t border-border/50 overflow-hidden">
        {/* Subtle background pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=1920&h=600&fit=crop&crop=edges')`,
          }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-card-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
                BDP Publications
              </h3>
              <p className="text-muted-foreground literary-text">
                Crafting stories that matter, one page at a time. Your journey into literature begins here.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-card-foreground">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Our Story</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-card-foreground">Find Us On</h4>
              <div className="flex gap-4">
                <Button size="sm" variant="outline" className="organic-curve" asChild>
                  <a href="https://facebook.com/bdppublications" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook className="w-4 h-4" />
                  </a>
                </Button>
                <Button size="sm" variant="outline" className="organic-curve" asChild>
                  <a href="https://instagram.com/bdppublications" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    {/* Instagram SVG icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
                  </a>
                </Button>
                <Button size="sm" variant="outline" className="organic-curve" asChild>
                  <a href="https://pinterest.com/bdppublications" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <Button size="sm" variant="outline" className="organic-curve" asChild>
                  <a href="https://gumroad.com/bdppublications" target="_blank" rel="noopener noreferrer" aria-label="Gumroad">
                    <ShoppingBag className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;