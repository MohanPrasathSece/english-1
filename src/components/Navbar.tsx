import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { ChevronRight, Menu, X, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/orchid_dental_logo-removebg-preview.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/team", label: "Our Team" },
  { to: "/treatments", label: "Treatments" },
  { to: "/fees", label: "Fees" },
  { to: "/contact", label: "Contact" },
];

interface NavbarProps {
  user: any;
  onLogout: () => void;
  onOpenAuth: () => void;
}

const Navbar = ({ user, onLogout, onOpenAuth }: NavbarProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (to: string) => {
    if (location.pathname === to) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  useEffect(() => {
    if (!mobileOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-card/80" style={{ boxShadow: "var(--shadow-sm)" }}>
      <div className="container mx-auto flex items-center justify-between py-2 px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Orchid Dental" className="h-14 w-14 object-contain" />
          <span className="text-xl font-bold text-foreground tracking-tight font-rossetti">
            Orchid <span className="text-primary">Dental</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => handleNavClick(link.to)}
              className="relative px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors duration-200"
            >
              {link.label}
              {location.pathname === link.to && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full"
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                />
              )}
            </Link>
          ))}
          {user && (
            <Link
              to="/dashboard"
              onClick={() => handleNavClick("/dashboard")}
              className="relative px-4 py-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Crypto Experience
              {location.pathname === "/dashboard" && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full"
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                />
              )}
            </Link>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/80 transition-colors duration-200"
          >
            Contact Us
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <User size={14} /> {user.name}
              </span>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1 px-4 py-2.5 rounded-lg bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors duration-200"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 active:scale-95 transition-all duration-200"
            >
              Client Portal
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-md"
              aria-label="Close menu"
            />

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
              className="relative mx-auto mt-20 w-[calc(100%-2.5rem)] max-w-sm rounded-3xl bg-white/95 shadow-2xl ring-1 ring-black/10 overflow-hidden"
            >
              <div className="px-6 py-6">
                <nav className="space-y-2">
                  {links.map((link, i) => {
                    const active = location.pathname === link.to;

                    return (
                      <motion.div
                        key={link.to}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.04 }}
                      >
                        <Link
                          to={link.to}
                          onClick={() => handleNavClick(link.to)}
                          className={
                            "flex items-center justify-between rounded-2xl px-5 py-4 text-base font-medium transition-colors " +
                            (active
                              ? "bg-primary/10 text-primary"
                              : "text-foreground/80 hover:text-foreground hover:bg-black/5")
                          }
                        >
                          <span>{link.label}</span>
                          <ChevronRight size={18} className={active ? "text-primary" : "text-foreground/60"} />
                        </Link>
                      </motion.div>
                    );
                  })}

                  {user && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <Link
                        to="/dashboard"
                        onClick={() => handleNavClick("/dashboard")}
                        className={
                          "flex items-center justify-between rounded-2xl px-5 py-4 text-base font-semibold transition-colors " +
                          (location.pathname === "/dashboard"
                            ? "bg-primary/10 text-primary"
                            : "text-primary hover:bg-primary/5")
                        }
                      >
                        <span>Crypto Experience</span>
                        <ChevronRight size={18} className="text-primary" />
                      </Link>
                    </motion.div>
                  )}

                  {/* Portal Button / User Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4 border-t border-gray-100 flex flex-col gap-2"
                  >
                    {user ? (
                      <div className="flex flex-col gap-2">
                        <div className="px-5 py-2 text-xs text-muted-foreground flex items-center gap-1.5">
                          <User size={14} /> Logged in: {user.name}
                        </div>
                        <button
                          onClick={() => {
                            onLogout();
                            setMobileOpen(false);
                          }}
                          className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-2xl bg-red-50 text-red-600 font-semibold text-sm hover:bg-red-100 transition-colors"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          onOpenAuth();
                          setMobileOpen(false);
                        }}
                        className="w-full px-5 py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 active:scale-95 transition-all text-center"
                      >
                        Client Portal
                      </button>
                    )}
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </nav>
  );
};

export default Navbar;
