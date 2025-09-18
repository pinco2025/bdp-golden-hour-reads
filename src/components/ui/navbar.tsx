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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-black/20 backdrop-blur-md border-b border-white/5"
        } organic-curve-subtle`}
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          background: isScrolled 
            ? 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)' 
            : 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative logo-glow">
                <img
                  src="/logo/bdpnewlogo.png"
                  alt="BDP Publications"
                  className={`compass-logo w-12 h-12 object-contain transition-all duration-300 ${
                    isScrolled
                      ? "drop-shadow-md"
                      : "drop-shadow-lg filter brightness-110"
                  }`}
                />
                {/* Logo backdrop for better visibility */}
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  isScrolled ? "bg-white/20 shadow-lg" : "bg-white/10 shadow-md"
                } -z-10 backdrop-blur-sm`} />
              </div>
              <span 
                className={`text-xl font-bold hidden sm:block transition-colors duration-300 text-white drop-shadow-lg`} 
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}
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
                  className={`font-medium transition-all duration-300 hover:text-primary text-white drop-shadow-lg ${
                    activeSection === item.id
                      ? "text-primary border-b-2 border-primary shadow-lg"
                      : "hover:scale-105"
                  }`}
                  style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
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
                    className="navbar-social-icon organic-curve hover:scale-110 transition-all duration-300 border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-primary hover:text-white hover:border-primary/50 shadow-lg hover:shadow-xl"
                    style={{
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)'
                    }}
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
              className="md:hidden organic-curve transition-all duration-300 border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-primary hover:text-white hover:border-primary/50 shadow-lg hover:shadow-xl"
              style={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
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
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-20 left-0 right-0 mx-4">
            <div 
              className="bg-black/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6"
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.9) 100%)'
              }}
            >
              {/* Mobile Navigation */}
              <div className="space-y-4 mb-6">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left font-medium py-2 px-4 rounded-lg transition-all duration-300 ${
                      activeSection === item.id
                        ? "text-primary bg-primary/20 border border-primary/30 shadow-lg"
                        : "text-white hover:text-primary hover:bg-white/10 hover:scale-105"
                    }`}
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile Social Links */}
              <div className="border-t border-white/20 pt-4">
                <p className="text-sm text-white/80 mb-3" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Follow us:</p>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <Button
                        key={social.name}
                        size="sm"
                        variant="outline"
                        className="organic-curve hover:scale-110 transition-all duration-300 border-white/20 bg-white/10 text-white hover:bg-primary hover:text-white hover:border-primary/50 shadow-lg hover:shadow-xl backdrop-blur-sm"
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