import { useState } from "react";
import { ShieldCheck, Cpu, Building, Target, Globe, Users, ArrowRight, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInView from "@/components/FadeInView";
import SEO from "@/components/SEO";
import { useNavigate } from "react-router-dom";

interface CryptoExperienceProps {
  user: any;
}

export default function CryptoExperience({ user }: CryptoExperienceProps) {
  const [activeTab, setActiveTab] = useState<"methods" | "company">("methods");
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("sessionToken");
    if (token) {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("Logout failed", err);
      }
    }
    localStorage.removeItem("sessionToken");
    window.location.href = "/"; // Force full reload to clear state and go to home
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <SEO title="About Us & Methodology | Asset Circle" canonical="/dashboard" />

      {/* Page Header */}
      <div className="bg-card border-b border-border pt-24 pb-8">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-1">Welcome, {user?.name?.split(' ')[0] || "Client"}</p>
              <h1 className="text-3xl font-extrabold text-foreground">
                Inside Asset Circle
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Discover our institutional framework and core philosophy.
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-50 text-red-500 border border-red-200 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors"
              >
                <LogOut size={16} /> Secure Logout
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl mt-8">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-8 gap-2 no-scrollbar">
          {[
            { id: "methods", icon: Cpu, label: "Our Working Methods" },
            { id: "company", icon: Building, label: "About Our Company" }
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
            {activeTab === "methods" && (
              <div className="space-y-8">
                <div className="bg-card border border-border p-8 rounded-3xl shadow-sm">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Algorithmic Precision meets Human Oversight</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                    Our methodology bridges the gap between high-frequency quantitative analysis and prudent risk management. We do not rely on speculative guessing; instead, we deploy deterministic algorithms that identify and capture market inefficiencies before they correct.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-secondary rounded-2xl border border-border group hover:border-primary/50 transition-colors">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Target size={24} />
                      </div>
                      <h3 className="font-bold text-foreground mb-2">Arbitrage Detection</h3>
                      <p className="text-sm text-muted-foreground">
                        Our systems scan global liquidity pools to find price disparities across decentralized exchanges. By executing simultaneous buy and sell orders, we lock in yield without directional market risk.
                      </p>
                    </div>

                    <div className="p-6 bg-secondary rounded-2xl border border-border group hover:border-blue-500/50 transition-colors">
                      <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <ShieldCheck size={24} />
                      </div>
                      <h3 className="font-bold text-foreground mb-2">Zero-Knowledge Verification</h3>
                      <p className="text-sm text-muted-foreground">
                        Before any algorithmic trade is executed, it passes through our ZK-proof verification layer. This ensures that the transaction parameters are mathematically guaranteed to be profitable before execution, eliminating failed trades.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary text-primary-foreground p-8 rounded-3xl shadow-sm relative overflow-hidden">
                  <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                    <Cpu size={300} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 relative z-10">Continuous Model Training</h3>
                  <p className="opacity-90 max-w-2xl text-sm leading-relaxed relative z-10 mb-6">
                    Our AI models are never static. They undergo continuous reinforcement learning, adapting to new blockchain protocols, shifting macroeconomic trends, and fluctuating volatility indexes. This ensures our yield generation strategies remain robust in both bull and bear markets.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "company" && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-card border border-border p-8 rounded-3xl shadow-sm h-full flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Our Heritage & Mission</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                      Asset Circle was founded by a consortium of former quantitative analysts and blockchain security engineers. We witnessed first-hand how institutional giants utilized complex algorithms to extract billions from the crypto markets with virtually zero risk, while retail investors were left exposed to high volatility.
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Our mission is to democratize access to institutional-grade yield generation. We provide the infrastructure, the algorithms, and the cold-storage security so our clients can grow their digital wealth safely.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-card border border-border p-6 rounded-3xl shadow-sm flex items-center gap-4 hover:bg-secondary transition-colors">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                        <Globe size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">Global Presence</h4>
                        <p className="text-xs text-muted-foreground">Operating across 14 financial jurisdictions with full compliance.</p>
                      </div>
                    </div>
                    
                    <div className="bg-card border border-border p-6 rounded-3xl shadow-sm flex items-center gap-4 hover:bg-secondary transition-colors">
                      <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center shrink-0">
                        <Users size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">10,000+ Active Clients</h4>
                        <p className="text-xs text-muted-foreground">Trusted by high-net-worth individuals and corporate treasuries.</p>
                      </div>
                    </div>

                    <div className="bg-card border border-border p-6 rounded-3xl shadow-sm flex items-center gap-4 hover:bg-secondary transition-colors">
                      <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center shrink-0">
                        <Building size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">Tier-1 Partnerships</h4>
                        <p className="text-xs text-muted-foreground">Collaborating with elite custodians and primary liquidity providers.</p>
                      </div>
                    </div>
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
