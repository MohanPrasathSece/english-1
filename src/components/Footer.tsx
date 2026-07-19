import { Link } from "react-router-dom";
import { Shield, ArrowRight } from "lucide-react";

interface FooterProps {
  onOpenAuth?: (tab?: "login" | "signup") => void;
}

const Footer = ({ onOpenAuth }: FooterProps) => {
  return (
    <footer className="bg-secondary text-muted-foreground py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-primary w-8 h-8" />
              <span className="text-xl font-bold tracking-tight text-foreground">
                Asset<span className="text-primary">Circle</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Institutional-grade digital asset custody, yield optimization, and blockchain investment systems.
            </p>
            {onOpenAuth && (
              <button
                onClick={() => onOpenAuth("signup")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/20 transition-colors"
              >
                Create Free Account <ArrowRight size={14} />
              </button>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-foreground">Platform</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => window.scrollTo(0, 0)} className="text-sm text-left text-muted-foreground hover:text-primary transition-colors">
                Home
              </button>
              {onOpenAuth && (
                <button onClick={() => onOpenAuth("login")} className="text-sm text-left text-muted-foreground hover:text-primary transition-colors">
                  Client Login
                </button>
              )}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-foreground">Legal Documents</h4>
            <div className="flex flex-col gap-2">
              <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
            </div>
            <p className="text-xs text-muted-foreground/70 mt-6">
              Authorised digital asset custody service. Zero-Knowledge protocols active.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground/60">
          &copy; {new Date().getFullYear()} Asset Circle. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
