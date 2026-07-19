import { Link } from "react-router-dom";
import { Shield, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="text-primary w-8 h-8" />
              <span className="text-xl font-bold tracking-tight text-white">
                Vertex<span className="text-primary">IQ</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Institutional-grade digital asset custody, yield optimization, and blockchain investment systems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-slate-200">Legal Documents</h4>
            <div className="flex flex-col gap-2">
              <Link to="/privacy-policy" className="text-sm text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-slate-200">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <a href="mailto:support@vertexiq.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={16} className="text-primary" />
                <span>support@vertexiq.com</span>
              </a>
              <p className="text-xs text-slate-500">
                Authorized digital asset custody service. Zero-Knowledge protocols active.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} VertexIQ. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
