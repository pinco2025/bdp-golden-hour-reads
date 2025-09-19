import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/ui/navbar";
import NewsletterSubscription from "@/components/NewsletterSubscription";
import { BookOpen, Heart, Star, ExternalLink, Facebook, ShoppingBag } from "lucide-react";

const Index = () => {
  const featuredBooks = [
    {
      title: "The Deep Sleep Protocol",
      author: "Beyond Digital Paradigms",
      cover: "https://public-files.gumroad.com/wsjs35fsrzft4qeky5gqgqdny9vp",
      description: "Evidence-based protocols for optimizing sleep and wellness naturally",
      price: "$1",
      gumroadUrl: "https://bdppublications.gumroad.com/l/deepsleeprotocol",
      platforms: ["gumroad", "facebook", "pinterest"]
    },
    {
      title: "The 5-Year Horizon",
      author: "Beyond Digital Paradigms",
      cover: "https://public-files.gumroad.com/t0iouzm37kmuuhiw37um7bu1wj6r",
      description: "Your definitive blueprint for a financially secure and purpose-driven retirement",
      price: "₹149",
      gumroadUrl: "https://bdppublications.gumroad.com/l/fiveyearhorizon",
      platforms: ["gumroad", "pinterest"]
    },
    {
      title: "The Holistic Wealth Blueprint",
      author: "Beyond Digital Paradigms",
      cover: "https://public-files.gumroad.com/uav9wpgqjkjf1nn1261q716kk8fg",
      description: "A comprehensive guide to building sustainable wealth through holistic principles",
      price: "₹149",
      gumroadUrl: "https://bdppublications.gumroad.com/l/holisticwealth",
      platforms: ["gumroad", "facebook", "pinterest"]
    },
    {
      title: "Digital Delusion: The Implosion of Sam Bankman-Fried and the FTX House of Cards",
      author: "Beyond Digital Paradigms",
      cover: "https://public-files.gumroad.com/zfttlvpi4sqpeefprf73dliohuqw",
      description: "An in-depth analysis of the FTX collapse and crypto market dynamics",
      price: "$149",
      gumroadUrl: "https://bdppublications.gumroad.com/l/digitaldelusion",
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
      {/* Dynamic Navbar */}
      <Navbar onNavigate={scrollToSection} />
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=edges')`,
          }}
        />
        
        {/* Compass-themed overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/45 via-accent/35 to-background/75" />
        
        {/* Maritime overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
        
        {/* Floating Compass Elements */}
        <div className="absolute top-20 left-10 animate-pulse">
          <div className="bg-primary/15 backdrop-blur-md rounded-full p-4 border border-primary/30 shadow-lg">
            <BookOpen className="w-8 h-8 text-primary/80" />
          </div>
        </div>
        <div className="absolute bottom-32 right-16 animate-pulse delay-700">
          <div className="bg-accent/15 backdrop-blur-md rounded-full p-3 border border-accent/30 shadow-lg">
            <Heart className="w-6 h-6 text-accent/80" />
          </div>
        </div>
        <div className="absolute top-1/3 right-20 animate-pulse delay-1000">
          <div className="bg-primary/12 backdrop-blur-md rounded-full p-4 border border-primary/25 shadow-lg">
            <Star className="w-7 h-7 text-primary/70" />
          </div>
        </div>
        {/* Additional maritime floating elements */}
        <div className="absolute top-1/4 left-1/4 animate-pulse delay-500">
          <div className="bg-primary/8 backdrop-blur-sm rounded-full p-2 border border-primary/20">
            <div className="w-3 h-3 bg-primary/50 rounded-full shadow-glow"></div>
          </div>
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-pulse delay-1500">
          <div className="bg-accent/8 backdrop-blur-sm rounded-full p-2 border border-accent/20">
            <div className="w-4 h-4 bg-accent/50 rounded-full shadow-glow"></div>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <div className="mb-8 flex justify-center">
            <div className="relative logo-glow">
              <img
                src="/logo/bdpnewlogo.png"
                alt="BDP Publications Logo"
                className="compass-logo w-36 h-36 object-contain drop-shadow-2xl filter brightness-110 hover:cursor-pointer"
                style={{ aspectRatio: '1/1' }}
              />
              {/* Enhanced backdrop for better visibility */}
              <div className="absolute inset-0 bg-gradient-radial from-white/20 via-primary/5 to-transparent rounded-full blur-2xl -z-10"></div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl text-minimal-bold mb-6 text-white leading-tight text-shadow">
            <span>
              Discover Your Next
            </span>
            <br />
            <span className="text-accent text-shadow">
              Great Read
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 text-clean max-w-2xl mx-auto text-shadow">
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
      <section id="about" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1418065460487-3d7cc9b0c3f2?w=1920&h=1080&fit=crop&crop=edges')`,
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-secondary/50 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-compass-heading text-black mb-6 sm:mb-8 typewriter">
                Beyond Digital Paradigms
              </h2>
              <div className="space-y-6 sm:space-y-8">
                <p className="text-base sm:text-lg lg:text-xl text-maritime text-black fade-in leading-relaxed">
                  We are <strong className="text-primary font-bold">pioneers</strong> at the intersection of holistic wellness, 
                  financial wisdom, and digital awareness. Our mission transcends traditional publishing—we craft 
                  <em className="text-accent font-semibold"> evidence-based protocols</em> and paradigm-shifting 
                  insights that empower individuals to reclaim their health, wealth, and digital autonomy.
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-maritime text-black fade-in-delayed leading-relaxed">
                  From <span className="font-semibold text-primary">optimizing sleep naturally</span> to building 
                  <span className="font-semibold text-accent">sustainable wealth</span>, from understanding 
                  <span className="font-medium text-primary">crypto market dynamics</span> to planning 
                  <span className="font-medium text-accent">secure retirements</span>—each publication represents 
                  years of research distilled into actionable wisdom.
                </p>
                <div className="fade-in-more-delayed">
                  <p className="text-sm sm:text-base lg:text-lg font-semibold text-black italic">
                    "We don't just publish books; we architect blueprints for transformed lives."
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 fade-in-more-delayed">
                <div className="glassmorphism rounded-2xl p-4 sm:p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                  <h4 className="text-lg sm:text-xl text-minimal-bold text-primary mb-2 sm:mb-3 group-hover:text-accent transition-colors">
                    📊 Evidence-Based
                  </h4>
                  <p className="text-xs sm:text-sm text-clean text-muted-foreground leading-relaxed">
                    Every protocol backed by rigorous research, peer-reviewed studies, and real-world testing across diverse populations.
                  </p>
                </div>
                <div className="glassmorphism rounded-2xl p-4 sm:p-6 border border-accent/20 hover:border-accent/40 transition-all duration-300 group">
                  <h4 className="text-lg sm:text-xl text-minimal-bold text-accent mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                    🧭 Paradigm Shifting
                  </h4>
                  <p className="text-xs sm:text-sm text-clean text-muted-foreground leading-relaxed">
                    Challenging conventional wisdom with innovative, holistic approaches that transform how you think about health and wealth.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden mt-8 lg:mt-0 order-first lg:order-last">
              <div className="organic-curve bg-white/30 backdrop-blur-lg p-4 sm:p-6 lg:p-8 shadow-warm border border-white/40">
                <img 
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=600&fit=crop&crop=edges" 
                  alt="Modern workspace with books, technology and warm lighting representing the intersection of digital and traditional knowledge"
                  className="w-full h-auto rounded-lg shadow-warm max-h-72 sm:max-h-80 lg:max-h-none object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="relative py-8 bg-gradient-to-r from-transparent via-primary/20 to-transparent">
        <div className="max-w-4xl mx-auto px-6">
          <div className="border-t-2 border-primary/30 mb-2"></div>
          <div className="border-t-2 border-accent/30"></div>
        </div>
      </div>

      {/* Featured Books Section */}
      <section id="featured-books" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1418065460487-3d7cc9b0c3f2?w=1920&h=1080&fit=crop&crop=edges')`,
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-secondary/50 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="glassmorphism-strong rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-compass-heading mb-4 sm:mb-6 text-foreground">
                Featured Collection
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-clean max-w-2xl mx-auto">
                Handpicked titles that have touched hearts and changed minds. Each book is a doorway to new perspectives.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {featuredBooks.map((book, index) => (
              <Card key={index} className="organic-curve overflow-hidden book-hover border border-white/20 shadow-warm bg-white/10 backdrop-blur-lg group cursor-pointer mx-auto max-w-sm w-full">
                <a href={book.gumroadUrl} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={book.cover} 
                      alt={`${book.title} book cover`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-minimal-bold text-base sm:text-lg mb-2 text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 text-minimal">by {book.author}</p>
                    <p className="text-xs sm:text-sm text-clean text-muted-foreground mb-3 sm:mb-4 line-clamp-3">{book.description}</p>
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="text-base sm:text-lg font-bold text-primary">{book.price}</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {book.platforms.includes('gumroad') && (
                      <Button size="sm" className="flex-1 min-w-0 organic-curve text-xs sm:text-sm px-2 sm:px-3" asChild>
                        <a href={book.gumroadUrl} target="_blank" rel="noopener noreferrer" aria-label="Buy on Gumroad">
                          <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          <span className="hidden xs:inline">Buy Now</span>
                          <span className="xs:hidden">Buy</span>
                        </a>
                      </Button>
                    )}
                    {book.platforms.includes('facebook') && (
                      <Button size="sm" variant="outline" className="organic-curve border-primary/50 p-2" asChild>
                        <a href="https://www.facebook.com/profile.php?id=61570296240601" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                          <Facebook className="w-3 h-3 sm:w-4 sm:h-4" />
                        </a>
                      </Button>
                    )}
                    {/* Always show Instagram button */}
                    <Button size="sm" variant="outline" className="organic-curve border-primary/50 p-2" asChild>
                      <a href="https://instagram.com/bdppublications" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-3 h-3 sm:w-4 sm:h-4"><rect width="20" height="20" x="2" y="2" rx="5" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
                      </a>
                    </Button>
                    {book.platforms.includes('pinterest') && (
                      <Button size="sm" variant="outline" className="organic-curve border-primary/50 p-2" asChild>
                        <a href="https://in.pinterest.com/bdppublications/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-3 h-3 sm:w-4 sm:h-4"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.853 0 1.264.641 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.807 1.481 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.744 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.334.135-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <div className="glassmorphism rounded-2xl p-4 sm:p-6 inline-block">
              <Button size="lg" variant="default" className="organic-curve bg-primary hover:bg-primary/90 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 glow shadow-warm text-sm sm:text-base" asChild>
                <a href="https://bdppublications.gumroad.com/" target="_blank" rel="noopener noreferrer">
                  View Full Catalog
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section id="community" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1475924156734-496f6cac893c?w=1920&h=1080&fit=crop&crop=edges')`,
          }}
        />
        
        {/* Darker compass-themed overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/35 via-accent/25 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Newsletter Subscription Component */}
          <div className="mb-8 sm:mb-12">
            <NewsletterSubscription 
              className="bg-white/95 backdrop-blur-xl border-white/40 shadow-glow"
              title="Join Our Reading Community"
              description="Be the first to discover new releases, get personalized recommendations, and receive exclusive content. We'll help you find your next great read!"
            />
          </div>
          
          {/* Social Media Links */}
          <div className="text-center">
            <div className="bg-black/20 backdrop-blur-xl p-4 sm:p-6 organic-curve text-white border border-white/20 shadow-glow">
              <p className="text-sm sm:text-base mb-4 opacity-90">
                Connect with us on social media for daily book updates and community discussions
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button size="sm" variant="secondary" className="organic-curve text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 bg-white/90 text-primary hover:bg-white" asChild>
                  <a href="https://www.facebook.com/profile.php?id=61570296240601" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    Follow on Facebook
                  </a>
                </Button>
                <Button size="sm" variant="secondary" className="organic-curve text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 bg-white/90 text-primary hover:bg-white" asChild>
                  <a href="https://instagram.com/bdppublications" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    Follow on Instagram
                  </a>
                </Button>
                <Button size="sm" variant="secondary" className="organic-curve text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 bg-white/90 text-primary hover:bg-white" asChild>
                  <a href="https://in.pinterest.com/bdppublications/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                    Visit Our Pinterest
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-card/80 backdrop-blur-lg py-12 px-6 border-t border-white/20 overflow-hidden">
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
              <h3 className="text-minimal-bold text-lg mb-4 text-card-foreground">
                BDP Publications
              </h3>
              <p className="text-muted-foreground text-clean">
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
              <h4 className="text-minimal-bold mb-6 text-card-foreground text-xl">Connect With Us</h4>
              <p className="text-muted-foreground text-clean mb-6 text-sm">
                Join our community and stay updated with the latest releases, exclusive content, and special offers.
              </p>
              
              {/* Social Media Grid - Fixed alignment */}
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto md:mx-0">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="footer-social-button organic-curve transition-all duration-300 shadow-warm hover:shadow-glow border-2 border-primary/30 hover:border-primary hover:bg-primary/10 text-card-foreground hover:text-primary group h-20 w-full" 
                  asChild
                >
                  <a 
                    href="https://www.facebook.com/profile.php?id=61570296240601" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Facebook" 
                    className="flex flex-col items-center justify-center gap-1.5 h-full"
                  >
                    <Facebook className="w-7 h-7 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold leading-none">Facebook</span>
                  </a>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="footer-social-button organic-curve transition-all duration-300 shadow-warm hover:shadow-glow border-2 border-primary/30 hover:border-primary hover:bg-primary/10 text-card-foreground hover:text-primary group h-20 w-full" 
                  asChild
                >
                  <a 
                    href="https://instagram.com/bdppublications" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Instagram" 
                    className="flex flex-col items-center justify-center gap-1.5 h-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-7 h-7 group-hover:scale-110 transition-transform">
                      <rect width="20" height="20" x="2" y="2" rx="5" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                    </svg>
                    <span className="text-xs font-semibold leading-none">Instagram</span>
                  </a>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="footer-social-button organic-curve transition-all duration-300 shadow-warm hover:shadow-glow border-2 border-primary/30 hover:border-primary hover:bg-primary/10 text-card-foreground hover:text-primary group h-20 w-full" 
                  asChild
                >
                  <a 
                    href="https://in.pinterest.com/bdppublications/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Pinterest" 
                    className="flex flex-col items-center justify-center gap-1.5 h-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-7 h-7 group-hover:scale-110 transition-transform">
                      <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.853 0 1.264.641 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.807 1.481 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.744 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.334.135-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                    </svg>
                    <span className="text-xs font-semibold leading-none">Pinterest</span>
                  </a>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="footer-social-button organic-curve transition-all duration-300 shadow-warm hover:shadow-glow border-2 border-primary/30 hover:border-primary hover:bg-primary/10 text-card-foreground hover:text-primary group h-20 w-full" 
                  asChild
                >
                  <a 
                    href="https://bdppublications.gumroad.com/"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Gumroad Store" 
                    className="flex flex-col items-center justify-center gap-1.5 h-full"
                  >
                    <ShoppingBag className="w-7 h-7 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold leading-none">Shop</span>
                  </a>
                </Button>
              </div>
              
              {/* Enhanced Call-to-action */}
              <div className="mt-8 p-5 bg-gradient-to-br from-primary/8 to-accent/5 rounded-2xl border border-primary/20 pulse-glow relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-accent/5 rounded-full translate-y-8 -translate-x-8"></div>
                
                <div className="text-center relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-lg">📚</span>
                    <p className="text-sm font-medium text-card-foreground">
                      Get exclusive content and updates
                    </p>
                    <span className="text-lg">✨</span>
                  </div>
                  <div className="flex justify-center gap-1 mb-2">
                    <span className="inline-block w-1.5 h-1.5 bg-primary/70 rounded-full animate-pulse"></span>
                    <span className="inline-block w-1.5 h-1.5 bg-primary/70 rounded-full animate-pulse delay-200"></span>
                    <span className="inline-block w-1.5 h-1.5 bg-primary/70 rounded-full animate-pulse delay-400"></span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Follow us on any platform above
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;