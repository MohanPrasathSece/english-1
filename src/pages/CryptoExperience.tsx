import { useState, FormEvent } from "react";
import { ShieldCheck, Cpu, Building, Target, Globe, Users, Mail, Phone, User, Loader2, Send } from "lucide-react";
import FadeInView from "@/components/FadeInView";
import SEO from "@/components/SEO";
import { toast } from "sonner";
import CountryDropdown, { countries, Country, cleanPhoneNumber } from "@/components/CountryDropdown";

export default function CryptoExperience() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);

  const handleContact = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const cleanDigits = cleanPhoneNumber(phoneVal, selectedCountry.dialCode);
    if (!selectedCountry.regex.test(cleanDigits)) {
      toast.error(`Invalid phone number. Example for ${selectedCountry.name}: ${selectedCountry.example}`);
      setLoading(false);
      return;
    }
    const formattedPhone = `+${selectedCountry.dialCode}${cleanDigits}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: formattedPhone, country: selectedCountry.iso, message }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        toast.error(data.message || "Something went wrong. Please try again.");
      } else if (data.alreadyExists) {
        toast.info(data.message);
        setName(""); setEmail(""); setPhoneVal(""); setMessage("");
      } else {
        toast.success("Enquiry received. Our institutional team will contact you shortly.");
        setName(""); setEmail(""); setPhoneVal(""); setMessage("");
      }
    } catch {
      toast.error("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <SEO title="Inside Asset Circle | Methodology & Company" canonical="/dashboard" />

      {/* Intro Section */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <FadeInView>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Client Portal</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
              Inside Asset Circle
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover our institutional framework, core philosophy, and how we operate in global financial markets.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Methods Section */}
      <section id="methods" className="py-24 border-t border-border">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeInView>
            <div className="text-center mb-16">
              <span className="text-primary font-semibold tracking-widest uppercase text-xs mb-3 block">Operational Blueprint</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Working Methods</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Algorithmic Precision meets Human Oversight. We do not rely on speculative guessing; instead, we deploy deterministic algorithms that capture market inefficiencies.
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <FadeInView delay={0.1}>
              <div className="p-8 bg-card rounded-3xl border border-border shadow-sm h-full group hover:border-primary/50 transition-colors">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Arbitrage Detection</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our systems continuously scan global liquidity pools to find price disparities across decentralized exchanges. By executing simultaneous buy and sell orders, we lock in yield without directional market risk.
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={0.2}>
              <div className="p-8 bg-card rounded-3xl border border-border shadow-sm h-full group hover:border-blue-500/50 transition-colors">
                <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Zero-Knowledge Verification</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Before any algorithmic trade is executed, it passes through our ZK-proof verification layer. This ensures that the transaction parameters are mathematically guaranteed to be profitable before execution.
                </p>
              </div>
            </FadeInView>
          </div>

          <FadeInView delay={0.3}>
            <div className="bg-primary text-primary-foreground p-10 rounded-3xl shadow-md relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
              <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                <Cpu size={400} />
              </div>
              <div className="flex-1 relative z-10">
                <h3 className="text-2xl font-bold mb-4">Continuous Model Training</h3>
                <p className="opacity-90 max-w-2xl text-base leading-relaxed">
                  Our AI models are never static. They undergo continuous reinforcement learning, adapting to new blockchain protocols, shifting macroeconomic trends, and fluctuating volatility indexes. This ensures our yield generation strategies remain robust globally.
                </p>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Company Section */}
      <section id="company" className="py-24 bg-secondary/30 border-t border-border">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeInView>
            <div className="text-center mb-16">
              <span className="text-primary font-semibold tracking-widest uppercase text-xs mb-3 block">Corporate Profile</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About Our Company</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Democratizing access to institutional-grade yield generation through secure infrastructure.
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeInView>
              <div className="bg-card border border-border p-10 rounded-3xl shadow-sm h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-foreground mb-6">Our Heritage & Mission</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                  Asset Circle was founded by a consortium of former quantitative analysts and blockchain security engineers. We witnessed first-hand how institutional giants utilized complex algorithms to extract billions from the crypto markets with virtually zero risk, while retail investors were left exposed to high volatility.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Our mission is to level the playing field. We provide the infrastructure, the algorithms, and the cold-storage security so our clients can grow their digital wealth safely.
                </p>
              </div>
            </FadeInView>
            
            <div className="grid gap-4">
              <FadeInView delay={0.1}>
                <div className="bg-card border border-border p-6 rounded-3xl shadow-sm flex items-center gap-6 hover:bg-secondary transition-colors group">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Globe size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-1">Global Presence</h4>
                    <p className="text-sm text-muted-foreground">Operating across 14 financial jurisdictions with full regulatory compliance.</p>
                  </div>
                </div>
              </FadeInView>
              
              <FadeInView delay={0.2}>
                <div className="bg-card border border-border p-6 rounded-3xl shadow-sm flex items-center gap-6 hover:bg-secondary transition-colors group">
                  <div className="w-14 h-14 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Users size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-1">10,000+ Active Clients</h4>
                    <p className="text-sm text-muted-foreground">Trusted by high-net-worth individuals and corporate treasuries worldwide.</p>
                  </div>
                </div>
              </FadeInView>

              <FadeInView delay={0.3}>
                <div className="bg-card border border-border p-6 rounded-3xl shadow-sm flex items-center gap-6 hover:bg-secondary transition-colors group">
                  <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Building size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-1">Tier-1 Partnerships</h4>
                    <p className="text-sm text-muted-foreground">Collaborating with elite custodians and primary liquidity providers.</p>
                  </div>
                </div>
              </FadeInView>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 border-t border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeInView>
            <div className="text-center mb-16">
              <span className="text-primary font-semibold tracking-widest uppercase text-xs mb-3 block">Reach Out</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Contact Support</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Need assistance or want to learn more about our institutional allocations? Get in touch with our team directly.
              </p>
            </div>
          </FadeInView>

          <FadeInView delay={0.1}>
            <div className="bg-card border border-border rounded-3xl shadow-lg overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-primary via-blue-500 to-primary" />
              <form onSubmit={handleContact} className="p-8 md:p-10 space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">Full Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        required type="text" placeholder="John Smith" value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        required type="email" placeholder="john@example.com" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="w-1/3 max-w-[120px]">
                      <CountryDropdown selectedCountry={selectedCountry} onChange={setSelectedCountry} />
                    </div>
                    <div className="relative flex-1">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        required type="tel" placeholder={selectedCountry.example} value={phoneVal}
                        onChange={(e) => setPhoneVal(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">Message</label>
                  <textarea
                    required placeholder="How can we assist you?" value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full p-4 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                >
                  {loading ? (
                    <><Loader2 size={18} className="animate-spin" /> Sending...</>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>
              </form>
            </div>
          </FadeInView>
        </div>
      </section>

    </div>
  );
}
