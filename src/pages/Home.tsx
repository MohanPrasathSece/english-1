import { useState, useEffect } from "react";
import { Shield, TrendingUp, Cpu, CheckCircle2, ArrowRight, Lock, Clock, Users, Building, Activity } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import FadeInView from "@/components/FadeInView";
import SEO from "@/components/SEO";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  onOpenAuth: (tab?: "login" | "signup") => void;
  user: any;
}

export default function Home({ onOpenAuth, user }: HomeProps) {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const yHeroBg = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const [btcPrice, setBtcPrice] = useState(94250.50);
  const [ethPrice, setEthPrice] = useState(3180.20);
  const [solPrice, setSolPrice] = useState(145.80);
  const [seatsLeft, setSeatsLeft] = useState(142);
  const [timeLeft, setTimeLeft] = useState(86400 * 3); // 3 days

  useEffect(() => {
    const interval = setInterval(() => {
      setBtcPrice((prev) => prev + (Math.random() - 0.5) * 60);
      setEthPrice((prev) => prev + (Math.random() - 0.5) * 6);
      setSolPrice((prev) => prev + (Math.random() - 0.5) * 2);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Randomly drop seats to simulate urgency
    const seatTimer = setInterval(() => {
      if (Math.random() > 0.7) {
        setSeatsLeft(prev => (prev > 12 ? prev - 1 : 12));
      }
    }, 15000);
    return () => clearInterval(seatTimer);
  }, []);

  const formatTime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
  };

  const handleCTA = () => {
    if (user) navigate("/dashboard");
    else onOpenAuth("signup");
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEO
        title="Asset Circle - Next-Generation Digital Asset Platform"
        description="Leverage institutional-grade AI market analysis, high-security cold custody, and diversified digital asset portfolios on Asset Circle."
        canonical="/"
      />

      {/* Urgency Banner */}
      <div className="bg-primary text-primary-foreground text-xs md:text-sm font-semibold py-2.5 px-4 text-center flex items-center justify-center gap-2 md:gap-4 overflow-hidden">
        <Users size={16} className="shrink-0 animate-pulse" />
        <span>Q3 Onboarding Almost Full: <span className="font-mono bg-white/20 px-1.5 py-0.5 rounded text-white mx-1">9,858 / 10,000</span> Filled</span>
        <span className="hidden md:inline-block">|</span>
        <span className="hidden md:inline-flex items-center gap-1.5"><Clock size={14} /> Allocation closes in: <span className="font-mono">{formatTime(timeLeft)}</span></span>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-12 pb-32 overflow-hidden">
        <motion.div style={{ y: yHeroBg }} className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-semibold text-primary mb-6 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Institutional Intelligence Now Public
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground leading-[1.1] mb-6 tracking-tight">
                The Intelligent Way to Manage{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                  Digital Wealth
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
                Experience next-generation asset growth backed by AI market intelligence and offline cold-storage security. Outperform traditional markets with algorithmic precision.
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCTA}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  {user ? "Access Dashboard" : "Secure Your Allocation"} <ArrowRight size={20} />
                </motion.button>
                {!user && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onOpenAuth("login")}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-secondary border border-border text-foreground font-semibold hover:bg-secondary/80 transition-all"
                  >
                    Client Login
                  </motion.button>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-[10px] font-bold text-foreground">
                      U{i}
                    </div>
                  ))}
                </div>
                <p>Join <strong className="text-foreground">9,800+</strong> institutional & retail clients</p>
              </div>
            </motion.div>

            {/* Right Trading Graph / Terminal Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.2, type: "spring" }}
              className="relative perspective-1000"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-3xl blur-2xl transform scale-105" />
              <div className="bg-card border border-border p-6 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-primary" />
                
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <Activity size={18} className="text-primary" /> Live AI Market Index
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">Real-time proprietary yield aggregation</p>
                  </div>
                  <motion.div 
                    animate={{ backgroundColor: ["#ecfdf5", "#d1fae5", "#ecfdf5"] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-xs font-mono px-3 py-1.5 rounded-full text-green-700 border border-green-200 shadow-sm"
                  >
                    +14.2% AI Yield
                  </motion.div>
                </div>

                {/* Animated Candlesticks */}
                <div className="h-56 flex items-end gap-3 border-b border-border pb-4 relative">
                  {/* Background grid */}
                  <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none">
                    <div className="border-b border-foreground w-full"></div>
                    <div className="border-b border-foreground w-full"></div>
                    <div className="border-b border-foreground w-full"></div>
                    <div className="border-b border-foreground w-full"></div>
                  </div>

                  {[40, 60, 45, 75, 50, 85, 65, 95].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: "10%" }}
                      animate={{ height: `${h}%` }}
                      transition={{ 
                        duration: 1.5, 
                        delay: i * 0.1, 
                        repeat: Infinity, 
                        repeatType: "reverse",
                        repeatDelay: 0.5 + Math.random()
                      }}
                      className="w-full relative group"
                    >
                      {/* Wick */}
                      <div className="absolute left-1/2 -translate-x-1/2 -top-4 -bottom-4 w-0.5 bg-muted-foreground/30" />
                      {/* Body */}
                      <div className={`relative w-full h-full rounded-sm ${i % 2 === 0 ? "bg-red-500/80" : "bg-green-500/90"} shadow-sm`} />
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[
                    { sym: "BTC", p: btcPrice },
                    { sym: "ETH", p: ethPrice },
                    { sym: "SOL", p: solPrice }
                  ].map((coin) => (
                    <motion.div key={coin.sym} layout className="p-3 bg-secondary rounded-xl border border-border">
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase">{coin.sym}/USD</p>
                      <h4 className="text-sm font-mono font-bold text-foreground mt-1">${coin.p.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}</h4>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating Alert */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, type: "spring" }}
                className="absolute -bottom-6 -left-6 bg-card border border-border shadow-xl p-4 rounded-2xl flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Auto-Rebalance Executed</p>
                  <p className="text-[10px] text-muted-foreground">Arbitrage detected across 3 markets</p>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-12 bg-secondary border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { num: "100%", label: "Cold Custody Guarantee" },
              { num: "14.2%", label: "Average AI APY Boost" },
              { num: "$1.2B+", label: "Assets Secured" },
              { num: "0", label: "Security Breaches" },
            ].map((s, i) => (
              <FadeInView key={s.label} delay={i * 0.1}>
                <p className="text-3xl md:text-4xl font-extrabold text-foreground font-mono mb-2">{s.num}</p>
                <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">{s.label}</p>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Authenticity / Institutional Architecture */}
      <section id="platform" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <FadeInView>
            <div className="max-w-3xl mx-auto text-center mb-20">
              <span className="text-primary font-semibold tracking-widest uppercase text-xs mb-3 block">Why Asset Circle</span>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">Institutional Architecture.<br/>Retail Accessibility.</h2>
              <p className="text-muted-foreground text-lg">
                We bridge the gap between complex algorithmic trading and everyday investors. Asset Circle deploys the exact same security and yield protocols used by Tier-1 hedge funds.
              </p>
            </div>
          </FadeInView>

          <div className="grid lg:grid-cols-3 gap-8">
            <FadeInView delay={0.1}>
              <div className="group bg-card border border-border p-8 rounded-3xl h-full flex flex-col hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Cpu size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">AI-Driven Arbitrage</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  Our proprietary neural networks scan global liquidity pools 24/7, executing micro-trades across fragmented markets to capture risk-free yield differentials.
                </p>
                <div className="pt-6 border-t border-border flex items-center gap-2 text-xs font-semibold text-foreground">
                  <Activity size={16} className="text-primary" /> Over 10M calculations per second
                </div>
              </div>
            </FadeInView>

            <FadeInView delay={0.2}>
              <div className="group bg-card border border-border p-8 rounded-3xl h-full flex flex-col hover:border-blue-500/50 transition-colors shadow-sm hover:shadow-md">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                  <Lock size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Military-Grade Cold Custody</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  99% of client assets are stored in air-gapped, geographically distributed vaults. Transactions require multi-signature approval from physically separated locations.
                </p>
                <div className="pt-6 border-t border-border flex items-center gap-2 text-xs font-semibold text-foreground">
                  <Shield size={16} className="text-blue-500" /> Zero-knowledge encryption standard
                </div>
              </div>
            </FadeInView>

            <FadeInView delay={0.3}>
              <div className="group bg-card border border-border p-8 rounded-3xl h-full flex flex-col hover:border-green-500/50 transition-colors shadow-sm hover:shadow-md">
                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform">
                  <Building size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Regulatory Compliance</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  Operating strictly within international financial frameworks. We partner with top-tier audit firms to ensure full reserve transparency and capital adequacy.
                </p>
                <div className="pt-6 border-t border-border flex items-center gap-2 text-xs font-semibold text-foreground">
                  <CheckCircle2 size={16} className="text-green-500" /> Quarterly proof-of-reserves audit
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Technology / Integrations (New Section) */}
      <section id="security" className="py-24 bg-secondary/50 border-t border-border relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <FadeInView>
            <div className="text-center mb-16">
              <span className="text-primary font-semibold tracking-widest uppercase text-xs mb-3 block">Technology Stack</span>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">Enterprise Infrastructure</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Asset Circle is powered by a robust, multi-layered technology stack designed to provide maximum uptime, latency-free arbitrage, and impenetrable security.
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-2 gap-8">
            <FadeInView delay={0.1}>
              <div className="bg-card border border-border p-8 rounded-3xl shadow-sm h-full flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 text-primary opacity-5 group-hover:opacity-10 transition-opacity">
                  <Activity size={200} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <TrendingUp size={20} />
                  </div>
                  Low-Latency Execution
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our trading servers are collocated directly at major decentralized exchange nodes. This ensures we can execute arbitrage trades milliseconds faster than the wider market, securing risk-free yield before slippage occurs.
                </p>
              </div>
            </FadeInView>
            <FadeInView delay={0.2}>
              <div className="bg-card border border-border p-8 rounded-3xl shadow-sm h-full flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 text-blue-500 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Shield size={200} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Lock size={20} />
                  </div>
                  Zero-Knowledge Proofs
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Asset Circle utilizes ZK-Rollups and advanced cryptographic protocols to verify transaction validity without exposing underlying private data. Your capital is moved securely with complete on-chain anonymity.
                </p>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Urgency CTA Section */}
      <section className="py-24 relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/20 blur-3xl rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <FadeInView>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Don't Miss the Q3 Allocation</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
              We limit onboarding to ensure maximum yield stability for our clients. Only <strong className="text-white bg-black/20 px-2 py-1 rounded mx-1">{seatsLeft}</strong> spots remain before registration closes.
            </p>
            
            <div className="flex flex-col items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCTA}
                className="px-10 py-5 rounded-2xl bg-background text-foreground font-bold text-lg shadow-xl shadow-black/10 hover:shadow-2xl transition-all"
              >
                Claim Your Account Now
              </motion.button>
              
              <div className="flex items-center gap-2 text-sm opacity-80 font-medium">
                <Clock size={16} /> Registration window closes in: <span className="font-mono bg-black/20 px-2 py-1 rounded">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Expanded FAQ Section */}
      <section id="faq" className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeInView>
            <div className="text-center mb-16">
              <span className="text-primary font-semibold tracking-widest uppercase text-xs mb-3 block">Knowledge Base</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Clear, transparent answers about how Asset Circle protects and grows your wealth.</p>
            </div>
          </FadeInView>

          <div className="space-y-4">
            {[
              { q: "How does the AI yield boost actually work?", a: "Our proprietary AI continuously monitors hundreds of liquidity pools and decentralized exchanges globally. It identifies price discrepancies (arbitrage) and high-yield lending opportunities, automatically reallocating capital in milliseconds to capture risk-free returns before the market corrects." },
              { q: "What happens if Asset Circle gets hacked?", a: "99% of user funds are kept in offline, air-gapped cold storage vaults that are physically disconnected from the internet. Even in the highly unlikely event of a platform breach, the core assets are cryptographically and physically unreachable by malicious actors." },
              { q: "Are there any lock-up periods?", a: "No. While our algorithms perform best over medium-to-long term horizons, we believe in absolute financial sovereignty. You maintain complete control and can request withdrawals at any time without artificial lock-up penalties." },
              { q: "Why is onboarding limited to specific quotas?", a: "To maintain the high APY generated by our AI strategies, we must carefully manage total value locked (TVL). Over-saturating the system dilutes the yield for everyone. By capping users per quarter, we guarantee consistent returns for existing clients." },
              { q: "Do I need prior cryptocurrency experience?", a: "Not at all. Asset Circle is designed as a 'set-and-forget' wealth management portal. Our dashboard abstracts away the complexities of blockchain networks, private key management, and gas fees. You simply deposit, monitor your yield, and withdraw." }
            ].map((faq, i) => (
              <FadeInView key={i} delay={i * 0.1}>
                <details className="bg-card border border-border p-6 rounded-2xl cursor-pointer group shadow-sm hover:shadow-md transition-all">
                  <summary className="text-base font-bold text-foreground list-none flex justify-between items-center">
                    {faq.q}
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-open:rotate-45 transition-transform">
                      <span className="text-primary text-xl leading-none">+</span>
                    </div>
                  </summary>
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed pr-8 border-t border-border pt-4">
                    {faq.a}
                  </p>
                </details>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
