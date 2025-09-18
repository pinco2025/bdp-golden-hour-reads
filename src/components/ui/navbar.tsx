import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Facebook, ShoppingBag, Menu, X } from "lucide-react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navigationItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "featured-books", label: "Books" },
    { id: "community", label: "Community" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61570296240601",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/bdppublications",
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <rect width="20" height="20" x="2" y="2" rx="5" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
        </svg>
      ),
    },
    {
      name: "Pinterest",
      href: "https://in.pinterest.com/bdppublications/",
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.853 0 1.264.641 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.807 1.481 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.744 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.334.135-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
        </svg>
      ),
    },
    {
      name: "Gumroad",
      href: "https://ishanq.gumroad.com/",
      icon: ShoppingBag,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-warm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="/logo/bdploog.png"
                  alt="BDP Publications"
                  className={`w-12 h-12 rounded-full object-cover transition-all duration-300 ${
                    isScrolled
                      ? "border-2 border-primary/30 shadow-md"
                      : "border-2 border-white/50 shadow-lg"
                  }`}
                />
                {/* Logo backdrop for better visibility */}
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  isScrolled ? "bg-white/10" : "bg-black/20"
                } -z-10`} />
              </div>
              <span 
                className={`text-xl font-bold hidden sm:block transition-colors duration-300 ${
                  isScrolled ? "text-foreground" : "text-white drop-shadow-lg"
                }`} 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                BDP Publications
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-medium transition-colors hover:text-primary ${
                    activeSection === item.id
                      ? "text-primary border-b-2 border-primary"
                      : isScrolled
                      ? "text-foreground"
                      : "text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop Social Links */}
            <div className="hidden lg:flex items-center space-x-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Button
                    key={social.name}
                    size="sm"
                    variant="outline"
                    className={`navbar-social-icon organic-curve hover:scale-110 transition-all duration-300 ${
                      isScrolled
                        ? "border-primary/40 hover:border-primary bg-white/80 text-primary hover:bg-primary hover:text-white shadow-md"
                        : "border-primary/60 bg-primary/10 backdrop-blur-sm text-primary hover:bg-primary hover:text-white hover:border-primary shadow-lg"
                    }`}
                    asChild
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex items-center justify-center"
                    >
                      <IconComponent />
                    </a>
                  </Button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className={`md:hidden organic-curve transition-all duration-300 ${
                isScrolled
                  ? "border-primary/40 bg-white/80 text-primary hover:bg-primary hover:text-white"
                  : "border-primary/60 bg-primary/10 backdrop-blur-sm text-primary hover:bg-primary hover:text-white"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-20 left-0 right-0 mx-4">
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl border border-white/20 shadow-warm p-6">
              {/* Mobile Navigation */}
              <div className="space-y-4 mb-6">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left font-medium py-2 px-4 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile Social Links */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-muted-foreground mb-3">Follow us:</p>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <Button
                        key={social.name}
                        size="sm"
                        variant="outline"
                        className="organic-curve hover:scale-110 transition-all duration-300 border-primary/40 bg-primary/5 text-primary hover:bg-primary hover:text-white hover:border-primary shadow-sm"
                        asChild
                      >
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          className="flex items-center justify-center"
                        >
                          <IconComponent />
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;