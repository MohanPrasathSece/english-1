import { useState, useEffect, FormEvent } from "react";
import { Shield, TrendingUp, Cpu, CheckCircle2, MessageSquare, Loader2, ArrowUpRight, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import FadeInView from "@/components/FadeInView";
import SEO from "@/components/SEO";
import CountryDropdown, { countries, Country, cleanPhoneNumber } from "../components/CountryDropdown";

export default function Home() {
  const [sending, setSending] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]); // default CH
  const [message, setMessage] = useState("");

  // Live prices
  const [btcPrice, setBtcPrice] = useState(94250);
  const [ethPrice, setEthPrice] = useState(3180);

  useEffect(() => {
    const interval = setInterval(() => {
      setBtcPrice((prev) => prev + (Math.random() - 0.5) * 60);
      setEthPrice((prev) => prev + (Math.random() - 0.5) * 6);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    const cleanDigits = cleanPhoneNumber(phoneVal, selectedCountry.dialCode);
    const isValid = selectedCountry.regex.test(cleanDigits);

    if (!isValid) {
      toast.error(`Invalid phone number. Example for ${selectedCountry.name}: ${selectedCountry.example}`);
      setSending(false);
      return;
    }

    const formattedPhone = `+${selectedCountry.dialCode}${cleanDigits}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: formattedPhone,
          country: selectedCountry.iso,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "We couldn't process your enquiry with the information provided.");
        setSending(false);
        return;
      }

      if (data.alreadyExists) {
        toast.info(data.message || "Enquiry already registered.");
      } else {
        setShowSuccessDialog(true);
      }

      setMessage("");
    } catch (err) {
      toast.error("Failed to submit enquiry. Please check your network and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden relative">
      <SEO
        title="VertexIQ - Next-Generation Crypto Yield & Asset Safety"
        description="Leverage institutional-grade AI market analysis, high security cold custody, and diversified digital asset portfolios on VertexIQ."
        canonical="/"
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-slate-950 to-slate-950" />
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInView>
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                  Welcome to VertexIQ
                </p>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6 font-sans">
                  The Intelligent Way to Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Digital Wealth</span>.
                </h1>
                <p className="text-base text-slate-300 leading-relaxed max-w-prose mb-8">
                  Experience next-generation asset growth backed by AI market intelligence and offline cold-storage security. Gain maximum yield and peace of mind.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#contact-section"
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 active:scale-95 transition-all duration-200"
                  >
                    Get Started
                  </a>
                  <a
                    href="#about-section"
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-750 transition-colors duration-200"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </FadeInView>

            {/* Trading Graph Preview */}
            <FadeInView delay={0.2}>
              <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-2xl shadow-medical-lg">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">Live Index Chart</h3>
                    <p className="text-xs text-slate-400">Real-time asset value performance</p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-green-500/10 text-green-400">
                    +12.4% Yield
                  </span>
                </div>
                <div className="h-48 flex items-end gap-2.5 border-b border-slate-800 pb-2">
                  <div className="w-full bg-slate-800 h-1/4 rounded-sm animate-pulse" />
                  <div className="w-full bg-primary h-2/4 rounded-sm" />
                  <div className="w-full bg-slate-800 h-1.5/4 rounded-sm animate-pulse" />
                  <div className="w-full bg-indigo-500 h-3/4 rounded-sm" />
                  <div className="w-full bg-primary h-4/4 rounded-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/40">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Bitcoin (BTC)</p>
                    <h4 className="text-sm font-mono font-bold text-white mt-1">${btcPrice.toFixed(2)}</h4>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/40">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Ethereum (ETH)</p>
                    <h4 className="text-sm font-mono font-bold text-white mt-1">${ethPrice.toFixed(2)}</h4>
                  </div>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Stats Ticker */}
      <section className="py-12 bg-slate-900/40 border-y border-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { num: "100%", label: "Custody Guarantee" },
              { num: "14.2%", label: "Average AI APY Boost" },
              { num: "20+", label: "Supported Countries" },
              { num: "$1.2B+", label: "Assets Secured" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-primary font-mono">{s.num}</p>
                <p className="text-xs text-slate-400 uppercase mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Main Concept Sections */}
      <section id="about-section" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Core Principles of VertexIQ</h2>
            <p className="text-slate-400 text-base">
              A comprehensive architecture built to increase your wealth under ultimate safety standards.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Section 1: Basics */}
            <FadeInView>
              <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800/60 p-8 rounded-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <Cpu size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Cryptocurrency & Blockchain Basics</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    Digital assets run on cryptographically secured, immutable ledgers. We make it easy to transition from legacy fiat systems to decentralized blockchain networks.
                  </p>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" /> Smart Contract Protocols
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" /> Decentralized Ledger Auditability
                  </li>
                </ul>
              </div>
            </FadeInView>

            {/* Section 2: Improving Investment Amount */}
            <FadeInView delay={0.15}>
              <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800/60 p-8 rounded-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <TrendingUp size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">AI Investment Growth</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    How we improve your investment amount: our automated market analysis algorithm executes real-time dollar-cost averaging, dynamic yield indexing, and risk-adjusted rebalancing.
                  </p>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" /> Strategic Yield Optimizers
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" /> Algorithmic Cycle Detection
                  </li>
                </ul>
              </div>
            </FadeInView>

            {/* Section 3: Safe & Secure */}
            <FadeInView delay={0.3}>
              <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800/60 p-8 rounded-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <Shield size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Absolute Security & Safety</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    How safe is your capital? We use offline cold storage, multi-signature keys, and continuous zero-knowledge security audits.
                  </p>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" /> 100% Offline Vault Storage
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-primary shrink-0" /> Multi-Signature Approvals
                  </li>
                </ul>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Candlestick Interactive Trading chart section */}
      <section className="py-16 bg-slate-900/20 border-y border-slate-900/80">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">Live Marketplace Index</h3>
            <p className="text-sm text-slate-400">Institutional grade candlestick signals updated in real-time</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-850 p-6 rounded-2xl">
            <svg viewBox="0 0 500 120" className="w-full h-32">
              <line x1="50" y1="20" x2="50" y2="80" stroke="#ef4444" strokeWidth="2" />
              <rect x="46" y="30" width="8" height="30" fill="#ef4444" />

              <line x1="110" y1="30" x2="110" y2="90" stroke="#10b981" strokeWidth="2" />
              <rect x="106" y="40" width="8" height="40" fill="#10b981" />

              <line x1="170" y1="10" x2="170" y2="80" stroke="#10b981" strokeWidth="2" />
              <rect x="166" y="20" width="8" height="50" fill="#10b981" />

              <line x1="230" y1="40" x2="230" y2="100" stroke="#ef4444" strokeWidth="2" />
              <rect x="226" y="50" width="8" height="35" fill="#ef4444" />

              <line x1="290" y1="20" x2="290" y2="90" stroke="#10b981" strokeWidth="2" />
              <rect x="286" y="30" width="8" height="45" fill="#10b981" />

              <line x1="350" y1="10" x2="350" y2="70" stroke="#10b981" strokeWidth="2" />
              <rect x="346" y="15" width="8" height="45" fill="#10b981" />
            </svg>
          </div>
        </div>
      </section>

      {/* Homepage Contact Form Section */}
      <section id="contact-section" className="py-24 relative z-10">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-primary w-6 h-6" />
              <h2 className="text-2xl font-bold text-white">Contact Our Desk</h2>
            </div>
            <p className="text-sm text-slate-400 mb-8">
              Ask a question about digital assets, APY cycles, or cold storage custody. Our representatives will respond shortly.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Full Name</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-primary transition-all"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Phone</label>
                <div className="flex gap-2">
                  <CountryDropdown selectedCountry={selectedCountry} onChange={setSelectedCountry} />
                  <input
                    required
                    type="tel"
                    value={phoneVal}
                    onChange={(e) => setPhoneVal(e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-primary transition-all font-mono"
                    placeholder={selectedCountry.example}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Email Address</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-primary transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Message (Optional)</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-primary transition-all resize-none"
                  placeholder="How can we assist you?"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {sending && <Loader2 size={16} className="animate-spin" />}
                {sending ? "Sending..." : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-400">Everything you need to know about VertexIQ</p>
          </div>
          <div className="space-y-4">
            <details className="bg-slate-900 border border-slate-800 p-4 rounded-xl cursor-pointer">
              <summary className="text-sm font-semibold text-white">How does the AI yield boost work?</summary>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                We monitor liquidity pools and arbitrage differentials globally. The system reallocates capital to safe, high-yielding contracts instantly.
              </p>
            </details>
            <details className="bg-slate-900 border border-slate-800 p-4 rounded-xl cursor-pointer">
              <summary className="text-sm font-semibold text-white">Are my funds guaranteed?</summary>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Yes, our zero-connectivity vaults ensure cold storage, meaning your assets are disconnected from the network and protected from any online security breach.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md text-center p-8 bg-slate-900 border border-slate-800 text-white">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-950 border border-green-500/30 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">Message Sent!</DialogTitle>
              <DialogDescription className="text-center text-slate-400 pt-2">
                Thank you for getting in touch. We have received your message and will contact you shortly.
              </DialogDescription>
            </DialogHeader>
            <button
              onClick={() => setShowSuccessDialog(false)}
              className="mt-6 px-8 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:brightness-110 transition-all focus:outline-none"
            >
              Continue
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
