import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { ChevronRight, Menu, X, LogOut, User, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "#platform", label: "Platform" },
  { to: "#security", label: "Security" },
  { to: "#faq", label: "FAQ" },
];

interface NavbarProps {
  user: any;
  onLogout: () => void;
  onOpenAuth: (tab?: "login" | "signup") => void;
}

const Navbar = ({ user, onLogout, onOpenAuth }: NavbarProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (to: string) => {
    if (to.startsWith("#")) {
      const element = document.getElementById(to.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (location.pathname === to) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-background/95 shadow-md border-b border-border" : "backdrop-blur-md bg-background/80 border-b border-border"}`}>
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
            <Shield className="text-primary w-7 h-7" />
          </motion.div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Asset<span className="text-primary">Circle</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to.startsWith("#") ? "/" + link.to : link.to}
              onClick={(e) => {
                if (link.to.startsWith("#")) {
                  if (location.pathname === "/") {
                    e.preventDefault();
                  }
                }
                handleNavClick(link.to);
              }}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
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
              My Portal
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
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full border border-border">
                <User size={13} /> {user.name}
              </span>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-50 text-red-500 text-sm font-semibold hover:bg-red-100 border border-red-200 transition-colors duration-200"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth("login")}
                className="px-4 py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors duration-200"
              >
                Login
              </button>
              <motion.button
                onClick={() => onOpenAuth("signup")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all duration-200 shadow-sm"
              >
                Get Started
              </motion.button>
            </div>
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
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card border border-border shadow-lg text-foreground"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
              className="relative mx-auto mt-20 w-[calc(100%-2.5rem)] max-w-sm rounded-3xl bg-card border border-border shadow-xl overflow-hidden"
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
                          to={link.to.startsWith("#") ? "/" + link.to : link.to}
                          onClick={(e) => {
                            if (link.to.startsWith("#")) {
                              if (location.pathname === "/") {
                                e.preventDefault();
                              }
                            }
                            handleNavClick(link.to);
                          }}
                          className={
                            "flex items-center justify-between rounded-2xl px-5 py-4 text-base font-medium transition-colors " +
                            (active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary")
                          }
                        >
                          <span>{link.label}</span>
                          <ChevronRight size={18} className={active ? "text-primary" : "text-muted-foreground"} />
                        </Link>
                      </motion.div>
                    );
                  })}

                  {user && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                      <Link
                        to="/dashboard"
                        onClick={() => handleNavClick("/dashboard")}
                        className={"flex items-center justify-between rounded-2xl px-5 py-4 text-base font-semibold transition-colors " +
                          (location.pathname === "/dashboard" ? "bg-primary/10 text-primary" : "text-primary hover:bg-primary/5")}
                      >
                        <span>My Portal</span>
                        <ChevronRight size={18} className="text-primary" />
                      </Link>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4 border-t border-border flex flex-col gap-2"
                  >
                    {user ? (
                      <div className="flex flex-col gap-2">
                        <div className="px-5 py-2 text-xs text-muted-foreground flex items-center gap-1.5">
                          <User size={14} /> Logged in: {user.name}
                        </div>
                        <button
                          onClick={() => { onLogout(); setMobileOpen(false); }}
                          className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-2xl bg-red-50 text-red-500 font-semibold text-sm border border-red-200"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => { onOpenAuth("login"); setMobileOpen(false); }}
                          className="w-full px-5 py-3 rounded-2xl border border-border text-foreground font-semibold text-sm hover:bg-secondary transition-all"
                        >
                          Already have an account? Login
                        </button>
                        <button
                          onClick={() => { onOpenAuth("signup"); setMobileOpen(false); }}
                          className="w-full px-5 py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 active:scale-95 transition-all text-center"
                        >
                          Get Started — It's Free
                        </button>
                      </div>
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
