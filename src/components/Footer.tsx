import { Link } from "react-router-dom";
import { Shield, Mail } from "lucide-react";

const Footer = () => {
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
            <p className="text-sm text-muted-foreground leading-relaxed">
              Institutional-grade digital asset custody, yield optimization, and blockchain investment systems.
            </p>
          </div>

          {/* Quick Links */}
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
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-foreground">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="mailto:support@assetcircle.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail size={16} className="text-primary" />
                <span>support@assetcircle.com</span>
              </a>
              <p className="text-xs text-muted-foreground/70">
                Authorised digital asset custody service. Zero-Knowledge protocols active.
              </p>
            </div>
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
