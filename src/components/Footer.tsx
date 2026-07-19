import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import logo from "/orchid_dental_logo-removebg-preview.png";
import { useState, useEffect } from "react";

const Footer = () => {
  const [showStickyFooter, setShowStickyFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowStickyFooter(true);
      } else {
        setShowStickyFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Main Footer */}
      <footer className="bg-foreground text-secondary py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="Orchid Dental" className="h-10 w-10 object-contain brightness-200" />
              </div>
              <h3 className="font-bold text-lg mb-4 text-white">Orchid Dental Practice</h3>
              <p className="text-sm text-white leading-relaxed">
                Modern dentistry for the whole family. Professional, gentle, and comprehensive care in a serene environment.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-secondary/50">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {[
                  { to: "/", label: "Home" },
                  { to: "/team", label: "Our Team" },
                  { to: "/treatments", label: "Treatments" },
                  { to: "/fees", label: "Fees" },
                  { to: "/contact", label: "Contact" },
                  { to: "/privacy-policy", label: "Privacy Policy" },
                  { to: "/terms", label: "Terms & Conditions" },
                ].map((l) => (
                  <Link key={l.to} to={l.to} className="text-sm text-secondary/70 hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-secondary/50">Services</h4>
              <div className="flex flex-col gap-2 text-sm text-secondary/70">
                {["Teeth Cleaning", "Teeth Whitening", "Root Canal Treatment", "Orthodontics", "Cosmetic Dentistry"].map(s => (
                  <Link key={s} to="/treatments" className="hover:text-primary transition-colors">{s}</Link>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-secondary/50">Contact</h4>
              <div className="flex flex-col gap-3 text-sm text-secondary/70">
                <a href="tel:02084592626" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone size={16} className="text-primary" />
                  <span className="font-mono">020 8459 2626</span>
                </a>
                <a href="mailto:info@orchiddental.co.uk" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail size={16} className="text-primary" />
                  <span>info@orchiddental.co.uk</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary shrink-0" />
                  <span>158–160 High Road, London NW10 2PB</span>
                </div>
                <div className="text-xs text-secondary/50 pt-1">
                  <span className="font-semibold">Local areas:</span> Dollis Hill, Willesden | Also serving: Brondesbury, Queens Park, Cricklewood
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-secondary/10 text-center">
            <div className="text-xs text-secondary/40 mb-2">
              &copy; {new Date().getFullYear()} Orchid Dental. All rights reserved.
            </div>
            <div className="text-xs text-secondary/40">
              Developed by{' '}
              <a
                href="https://www.zyradigitals.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Zyra Digitals
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Small Sticky Footer */}
      {showStickyFooter && (
        <div className="hidden sm:block fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-300 py-2 sm:py-1.5 z-50 shadow-lg">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <img src={logo} alt="Orchid Dental" className="h-5 w-5 object-contain shrink-0" />
                <span className="text-xs font-medium text-foreground truncate">Orchid Dental</span>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 text-xs">
                <a
                  href="tel:02084592626"
                  className="inline-flex items-center gap-1 rounded-lg bg-white/70 px-2.5 py-1.5 border border-black/10 text-foreground font-medium hover:bg-white transition-colors"
                  aria-label="Call Orchid Dental"
                >
                  <Phone size={12} className="text-primary" />
                  <span className="font-mono">020 8459 2626</span>
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 rounded-lg bg-white/70 px-2.5 py-1.5 border border-black/10 text-foreground font-medium hover:bg-white transition-colors sm:hidden"
                  aria-label="Contact Orchid Dental"
                >
                  <MapPin size={12} className="text-primary" />
                  <span>Directions</span>
                </Link>

                <div className="hidden sm:flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-1">
                    <MapPin size={10} className="text-primary" />
                    <span className="text-foreground font-medium">158–160 High Road, London NW10 2PB</span>
                  </div>
                  <div className="hidden lg:flex items-center gap-1">
                    <Mail size={10} className="text-primary" />
                    <span className="text-foreground font-medium">info@orchiddental.co.uk</span>
                  </div>
                  <div className="hidden xl:flex items-center gap-1">
                    <Clock size={10} className="text-primary" />
                    <span className="text-foreground font-medium">Mon-Fri 9am-5pm (closed 1-2pm)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
