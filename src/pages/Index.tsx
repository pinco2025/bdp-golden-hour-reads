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

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 gradient-sunrise opacity-90"
          style={{
            backgroundImage: `linear-gradient(135deg, 
              hsl(25 85% 75% / 0.9), 
              hsl(35 75% 85% / 0.8), 
              hsl(320 40% 90% / 0.7))`,
          }}
        />
        
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
          <div className="mb-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
            <p className="text-lg font-medium text-foreground/80">
              📖 Logo will be added here 📖
            </p>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
            <span style={{ fontFamily: 'Playfair Display, serif' }}>
              Discover Your Next
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Great Read
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-foreground/80 literary-text max-w-2xl mx-auto">
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
              className="organic-curve border-2 border-primary/50 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-lg px-8 py-6"
            >
              Learn Our Story
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-foreground/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
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
                <div className="text-center p-4 bg-card rounded-lg shadow-warm">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Premium Titles</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg shadow-warm">
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Happy Readers</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="organic-curve bg-gradient-to-br from-primary/20 to-accent/20 p-8 backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=600&fit=crop&crop=edges" 
                  alt="Cozy reading corner with books and warm lighting"
                  className="w-full h-auto rounded-lg shadow-warm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section id="featured-books" className="py-20 px-6 bg-gradient-to-br from-secondary/30 to-accent/10">
        <div className="max-w-7xl mx-auto">
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
                      <Button size="sm" className="flex-1 organic-curve">
                        <ShoppingBag className="w-4 h-4 mr-1" />
                        Gumroad
                      </Button>
                    )}
                    {book.platforms.includes('facebook') && (
                      <Button size="sm" variant="outline" className="organic-curve border-primary/50">
                        <Facebook className="w-4 h-4" />
                      </Button>
                    )}
                    {book.platforms.includes('pinterest') && (
                      <Button size="sm" variant="outline" className="organic-curve border-primary/50">
                        <ExternalLink className="w-4 h-4" />
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
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="gradient-sunset p-12 organic-curve text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Join Our Reading Community
            </h2>
            <p className="text-xl literary-text mb-8 opacity-90">
              Be the first to discover new releases, exclusive content, and special offers. 
              Your next favorite book is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="organic-curve text-lg px-8 py-6">
                Follow on Facebook
              </Button>
              <Button size="lg" variant="outline" className="organic-curve border-white/50 text-white hover:bg-white/20 text-lg px-8 py-6">
                Visit Our Pinterest
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm py-12 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
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
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">New Releases</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Author Guidelines</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-card-foreground">Find Us On</h4>
              <div className="flex gap-4">
                <Button size="sm" variant="outline" className="organic-curve">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="organic-curve">
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="organic-curve">
                  <ShoppingBag className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  📧 hello@bdppublications.com
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 BDP Publications. All rights reserved. Made with ❤️ for book lovers everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;