import { useState, useEffect } from "react";
import { ShieldCheck, TrendingUp, Cpu, Award, ArrowUpRight, Activity, Bell, Wallet, BarChart3, Clock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";

interface CryptoExperienceProps {
  user: any;
  onLogout?: () => void;
}

export default function CryptoExperience({ user }: CryptoExperienceProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "ai-yield" | "vault">("overview");

  // Mock live data for the dashboard
  const [btcPrice, setBtcPrice] = useState(94250.50);
  const [ethPrice, setEthPrice] = useState(3180.20);
  const [totalYield, setTotalYield] = useState(14.24);

  useEffect(() => {
    const interval = setInterval(() => {
      setBtcPrice(prev => prev + (Math.random() - 0.5) * 40);
      setEthPrice(prev => prev + (Math.random() - 0.5) * 4);
      setTotalYield(prev => prev + (Math.random() * 0.001));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <SEO title="My Portal | Asset Circle" canonical="/dashboard" />

      {/* Dashboard Header */}
      <div className="bg-card border-b border-border pt-24 pb-8">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-1">Client Portal</p>
              <h1 className="text-3xl font-extrabold text-foreground">
                Welcome back, {user?.name?.split(' ')[0] || "Investor"}
              </h1>
              <p className="text-muted-foreground mt-1 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Secure session active from {user?.country || "Global"}
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-secondary border border-border px-4 py-2.5 rounded-xl shadow-sm">
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-0.5">Account Status</p>
                <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-green-500" /> Fully Verified
                </p>
              </div>
              <button className="bg-primary/10 text-primary p-3 rounded-xl hover:bg-primary/20 transition-colors border border-primary/20">
                <Bell size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl mt-8">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-8 gap-2 no-scrollbar">
          {[
            { id: "overview", icon: BarChart3, label: "Portfolio Overview" },
            { id: "ai-yield", icon: Cpu, label: "AI Yield Engine" },
            { id: "vault", icon: Wallet, label: "Cold Vault" }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === t.id 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-card border border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-card border border-border p-6 rounded-3xl shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all">
                      <Wallet size={100} />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground mb-2">Total Balance (USD)</p>
                    <h2 className="text-4xl font-mono font-bold text-foreground tracking-tight">$0.00</h2>
                    <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-secondary w-fit px-3 py-1.5 rounded-lg">
                      <Clock size={14} /> Pending deposit confirmation
                    </div>
                  </div>

                  <div className="bg-card border border-border p-6 rounded-3xl shadow-sm relative overflow-hidden group hover:border-green-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all text-green-500">
                      <TrendingUp size={100} />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground mb-2">Current AI APY</p>
                    <h2 className="text-4xl font-mono font-bold text-green-500 tracking-tight flex items-baseline gap-2">
                      {totalYield.toFixed(2)}% <span className="text-sm font-sans text-green-500/70"><ArrowUpRight size={16}/></span>
                    </h2>
                    <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-secondary w-fit px-3 py-1.5 rounded-lg">
                      <Activity size={14} className="text-green-500" /> Optimized 2 mins ago
                    </div>
                  </div>

                  <div className="bg-card border border-border p-6 rounded-3xl shadow-sm relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all text-blue-500">
                      <Award size={100} />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground mb-2">Account Tier</p>
                    <h2 className="text-4xl font-bold text-foreground tracking-tight">Standard</h2>
                    <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-secondary w-fit px-3 py-1.5 rounded-lg">
                      <TrendingUp size={14} /> Deposit $10k+ for Premium
                    </div>
                  </div>
                </div>

                {/* Next Steps / Onboarding */}
                <div className="bg-card border border-border p-8 rounded-3xl shadow-sm">
                  <h3 className="text-xl font-bold text-foreground mb-6">Action Required to Start Earning</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary border border-border opacity-60">
                      <CheckCircle2 size={24} className="text-green-500 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground line-through">Create Account</h4>
                        <p className="text-sm text-muted-foreground">Successfully registered with Asset Circle.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/20 relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                      <div className="w-6 h-6 rounded-full border-2 border-primary text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">Fund Your Account</h4>
                        <p className="text-sm text-muted-foreground mb-4">You have $0.00 allocated to the AI Yield Engine. To begin generating returns, deposit funds via wire transfer or crypto.</p>
                        <button className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all shadow-sm">
                          Initiate Deposit
                        </button>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-background border border-border opacity-50">
                      <div className="w-6 h-6 rounded-full border-2 border-muted-foreground text-muted-foreground flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
                      <div>
                        <h4 className="font-semibold text-foreground">Yield Activation</h4>
                        <p className="text-sm text-muted-foreground">Your funds will automatically enter the next arbitrage cycle upon deposit confirmation.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ai-yield" && (
              <div className="space-y-6">
                <div className="bg-card border border-border p-8 rounded-3xl shadow-sm text-center py-16">
                  <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Cpu size={40} className="text-primary animate-pulse" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Yield Engine is Standing By</h2>
                  <p className="text-muted-foreground max-w-md mx-auto mb-8">
                    Our neural network is currently tracking 14,204 liquidity pools globally. Deposit capital to activate your personal node and start capturing risk-free arbitrage.
                  </p>
                  
                  <div className="max-w-3xl mx-auto bg-background border border-border rounded-2xl p-6 text-left">
                    <h3 className="font-semibold text-foreground mb-4 border-b border-border pb-2 flex items-center gap-2">
                      <Activity size={16} className="text-primary"/> Live Network Feed
                    </h3>
                    <div className="space-y-3 font-mono text-xs">
                      {[
                        { pair: "USDC/USDT", venue: "Curve", apy: "12.4%" },
                        { pair: "WBTC/BTC", venue: "Aave V3", apy: "8.1%" },
                        { pair: "WETH/stETH", venue: "Lido", apy: "5.6%" },
                      ].map((log, i) => (
                        <div key={i} className="flex justify-between p-2 rounded bg-secondary text-muted-foreground">
                          <span>[SCAN] {log.pair} @ {log.venue}</span>
                          <span className="text-green-500 font-bold">{log.apy} Available</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "vault" && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border border-border p-8 rounded-3xl shadow-sm h-full flex flex-col justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                    <ShieldCheck size={32} className="text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Zero-Knowledge Cold Vault</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    When you deposit, 99% of your capital is instantly routed to our Swiss-based, air-gapped cold storage facilities. Withdrawals require multi-signature approval and take up to 24 hours for security clearance.
                  </p>
                  <div className="bg-secondary p-4 rounded-xl border border-border text-sm font-semibold flex justify-between">
                    <span className="text-muted-foreground">Vault Status:</span>
                    <span className="text-green-500 flex items-center gap-1"><CheckCircle2 size={16}/> Secured & Active</span>
                  </div>
                </div>
                
                <div className="bg-card border border-border p-8 rounded-3xl shadow-sm h-full">
                  <h3 className="text-lg font-bold text-foreground mb-6">Approved Whitelist Addresses</h3>
                  <div className="flex flex-col items-center justify-center text-center h-48 border-2 border-dashed border-border rounded-2xl">
                    <Wallet size={32} className="text-muted-foreground/50 mb-3" />
                    <p className="text-sm font-semibold text-muted-foreground mb-1">No Addresses Whitelisted</p>
                    <p className="text-xs text-muted-foreground px-4 mb-4">You must whitelist a withdrawal address to move funds out of the vault.</p>
                    <button className="text-sm text-primary font-semibold hover:underline">Add Address</button>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
