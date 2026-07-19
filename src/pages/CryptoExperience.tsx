import { useState, useEffect, FormEvent } from "react";
import { ShieldCheck, TrendingUp, Cpu, Award, MessageSquare, Loader2, ArrowUpRight, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import CountryDropdown, { countries, Country, cleanPhoneNumber } from "../components/CountryDropdown";

interface CryptoExperienceProps {
  user: any;
}

export default function CryptoExperience({ user }: CryptoExperienceProps) {
  const [activeTab, setActiveTab] = useState<"basics" | "security" | "trends">("basics");
  const [submitting, setSubmitting] = useState(false);

  // Form states initialized with logged-in user details if available
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneVal, setPhoneVal] = useState(user?.phone || "");
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find(c => c.iso === user?.country) || countries[0]
  );
  const [message, setMessage] = useState("");

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const cleanDigits = cleanPhoneNumber(phoneVal, selectedCountry.dialCode);
    const isValid = selectedCountry.regex.test(cleanDigits);

    if (!isValid) {
      toast.error(`Invalid phone number. Example for ${selectedCountry.name}: ${selectedCountry.example}`);
      setSubmitting(false);
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
        setSubmitting(false);
        return;
      }

      if (data.alreadyExists) {
        toast.info(data.message || "Enquiry already registered.");
      } else {
        toast.success("Thank you! Your enquiry has been processed successfully.");
      }

      setMessage("");
    } catch (err) {
      toast.error("Failed to submit enquiry. Please check your network and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Simulating live prices
  const [btcPrice, setBtcPrice] = useState(94250);
  const [ethPrice, setEthPrice] = useState(3180);

  useEffect(() => {
    const interval = setInterval(() => {
      setBtcPrice(prev => prev + (Math.random() - 0.5) * 50);
      setEthPrice(prev => prev + (Math.random() - 0.5) * 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 overflow-hidden relative pb-20">
      {/* Decorative Ornaments (Floating Crypto Illustrations / Blur Blobs) */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Header / Hero */}
      <header className="relative z-10 pt-20 pb-10 text-center max-w-4xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
          <Cpu size={14} className="animate-spin" /> Next-Generation Digital Assets
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 font-rossetti tracking-tight">
          Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Crypto Experience</span>
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Explore institutional-grade insights, real-time market dynamics, and advanced safety standards built for modern digital asset investment.
        </p>
      </header>

      {/* Real-time Crypto Stats Ticker */}
      <div className="container mx-auto px-6 mb-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Bitcoin (BTC)</p>
              <h4 className="text-lg font-mono font-bold text-white mt-1">${btcPrice.toFixed(2)}</h4>
            </div>
            <ArrowUpRight className="text-green-400" size={18} />
          </div>
          <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Ethereum (ETH)</p>
              <h4 className="text-lg font-mono font-bold text-white mt-1">${ethPrice.toFixed(2)}</h4>
            </div>
            <ArrowUpRight className="text-green-400" size={18} />
          </div>
          <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-4 rounded-xl">
            <p className="text-xs text-slate-400 font-semibold uppercase">AI Yield Boost</p>
            <h4 className="text-lg font-bold text-indigo-400 mt-1">+14.2% APY</h4>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-4 rounded-xl">
            <p className="text-xs text-slate-400 font-semibold uppercase">Secured Assets</p>
            <h4 className="text-lg font-bold text-emerald-400 mt-1">100% Cold Storage</h4>
          </div>
        </div>
      </div>

      {/* Mac-style Browser Window containing tabs and sections */}
      <section className="container mx-auto px-6 max-w-5xl relative z-10 mb-20">
        <div className="bg-slate-800/30 backdrop-blur-lg border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
          {/* Mac Browser Header */}
          <div className="bg-slate-900/60 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
            {/* Window controls */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            </div>

            {/* Mac Tabs */}
            <div className="flex gap-1.5">
              <button
                onClick={() => setActiveTab("basics")}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "basics"
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Crypto Basics
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "security"
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Growth & Security
              </button>
              <button
                onClick={() => setActiveTab("trends")}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "trends"
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Market Analysis & FAQ
              </button>
            </div>

            <div className="text-[11px] text-slate-500 font-mono hidden md:block">
              https://orchiddental.co.uk/portal
            </div>
          </div>

          {/* Browser Window Body */}
          <div className="p-6 md:p-10">
            {activeTab === "basics" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Understanding Cryptocurrency & Blockchain</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Cryptocurrencies represent a paradigm shift in financial sovereignty. Built on decentralized peer-to-peer protocols, these digital assets exist without a central counterparty, guaranteeing trustless transparency through cryptographic proof.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-slate-800/40 border border-slate-700/40 p-5 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-3">
                      <TrendingUp size={20} />
                    </div>
                    <h4 className="text-base font-semibold text-white mb-2">Digital Assets</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      From smart contract protocols like Ethereum to stores-of-value like Bitcoin, digital assets redefine collateral standards.
                    </p>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/40 p-5 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-3">
                      <Cpu size={20} />
                    </div>
                    <h4 className="text-base font-semibold text-white mb-2">Blockchain Mechanics</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Immputable ledgers grouped by blocks, cryptographically linked and verified through globally distributed network nodes.
                    </p>
                  </div>

                  <div className="bg-slate-800/40 border border-slate-700/40 p-5 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-3">
                      <Award size={20} />
                    </div>
                    <h4 className="text-base font-semibold text-white mb-2">Crypto Investing</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Learn the fundamentals of spot markets, trading pairs, liquidity pools, and dollar-cost averaging (DCA) frameworks.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* 2 Core Concepts: Improving Investment & Safety */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="text-primary" size={28} />
                      <h3 className="text-xl font-bold text-white">How We Improve Your Investment Amount</h3>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      By utilizing state-of-the-art AI market analysis and automated portfolio rebalancing, our systems detect macroeconomic cycles and micro-trends ahead of standard market participants.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-400 list-disc list-inside">
                      <li>Strategic asset rebalancing</li>
                      <li>AI-driven downside hedging protocols</li>
                      <li>Institutional liquidity yield generation</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="text-emerald-400" size={28} />
                      <h3 className="text-xl font-bold text-white">How Safe & Secure is Your Capital?</h3>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Security is our core priority. 100% of reserves are secured in multi-signature cold wallets managed by top-tier custodians, insulated from hot-network exploits and single-point failures.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-400 list-disc list-inside">
                      <li>Offline cold-storage custodianship</li>
                      <li>Multi-signature authorization flows</li>
                      <li>Full collateralization audit logs</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "trends" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Live Candlestick Graph (SVG Mockup) */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Trading Candlestick & Market Trends</h4>
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-slate-300">VertexIQ Realtime Index Chart</span>
                      <span className="text-xs text-green-400 font-mono">+4.8% Today</span>
                    </div>
                    <svg viewBox="0 0 500 120" className="w-full h-24">
                      {/* Candlesticks */}
                      <line x1="40" y1="20" x2="40" y2="80" stroke="#ef4444" strokeWidth="2" />
                      <rect x="36" y="30" width="8" height="35" fill="#ef4444" />

                      <line x1="80" y1="40" x2="80" y2="100" stroke="#10b981" strokeWidth="2" />
                      <rect x="76" y="45" width="8" height="40" fill="#10b981" />

                      <line x1="120" y1="10" x2="120" y2="70" stroke="#10b981" strokeWidth="2" />
                      <rect x="116" y="20" width="8" height="45" fill="#10b981" />

                      <line x1="160" y1="50" x2="160" y2="90" stroke="#ef4444" strokeWidth="2" />
                      <rect x="156" y="55" width="8" height="25" fill="#ef4444" />

                      <line x1="200" y1="30" x2="200" y2="90" stroke="#10b981" strokeWidth="2" />
                      <rect x="196" y="35" width="8" height="45" fill="#10b981" />

                      <line x1="240" y1="15" x2="240" y2="70" stroke="#10b981" strokeWidth="2" />
                      <rect x="236" y="20" width="8" height="40" fill="#10b981" />

                      {/* Sparkline overlay */}
                      <path
                        d="M 40 47 L 80 65 L 120 42 L 160 67 L 200 57 L 240 40 L 280 25 L 320 35 L 360 20 L 400 15 L 440 22 L 480 12"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <HelpCircle size={18} className="text-primary" /> Common Questions
                  </h4>
                  <div className="space-y-3">
                    <details className="bg-slate-800/30 p-3 rounded-lg border border-slate-700/30 cursor-pointer">
                      <summary className="text-xs font-semibold text-slate-200">How do we guarantee fund safety?</summary>
                      <p className="text-xs text-slate-400 mt-2">
                        We leverage cold-storage hardware keys secured offline in vault locations, preventing internet connectivity or software vulnerability risk.
                      </p>
                    </details>
                    <details className="bg-slate-800/30 p-3 rounded-lg border border-slate-700/30 cursor-pointer">
                      <summary className="text-xs font-semibold text-slate-200">What are the fees associated with this platform?</summary>
                      <p className="text-xs text-slate-400 mt-2">
                        We believe in full transparency. There are 0% deposit/withdrawal commissions, and we only collect a standard performance yield cut on profits.
                      </p>
                    </details>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Logged-in contact form */}
      <section className="container mx-auto px-6 max-w-2xl relative z-10">
        <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-6 md:p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="text-primary" size={24} />
            <h3 className="text-xl font-bold text-white">Ask an Expert</h3>
          </div>
          <p className="text-sm text-slate-400 mb-6">
            Have questions about digital asset safety, blockchain systems, or AI-driven growth? Get in touch directly.
          </p>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Phone Number</label>
              <div className="flex gap-2">
                <CountryDropdown selectedCountry={selectedCountry} onChange={setSelectedCountry} />
                <input
                  required
                  type="tel"
                  placeholder={selectedCountry.example}
                  value={phoneVal}
                  onChange={(e) => setPhoneVal(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-primary transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Message (Optional)</label>
              <textarea
                rows={3}
                placeholder="Type your question here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-primary transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {submitting ? "Submitting..." : "Send Enquiry"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
