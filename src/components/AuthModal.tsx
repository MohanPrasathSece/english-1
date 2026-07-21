import { useState, useEffect, FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Mail, User, Phone, Shield, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CountryDropdown, { countries, Country, cleanPhoneNumber } from "./CountryDropdown";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (token: string, user: any) => void;
  initialTab?: "login" | "signup";
}

export default function AuthModal({ isOpen, onClose, onSuccess, initialTab = "signup" }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "signup">(initialTab);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);

  // Sync tab when initialTab changes
  useEffect(() => {
    if (isOpen) setTab(initialTab);
  }, [initialTab, isOpen]);

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (tab === "login") {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (!res.ok) {
          if (data.errorType === "user_not_found") {
            toast.error("No account found with this email. Please sign up first.");
          } else {
            toast.error(data.message || "Login failed. Please try again.");
          }
          return;
        }
        toast.success("Welcome back! You're now logged in.");
        onSuccess(data.sessionToken, data.user);
        onClose();
        navigate("/dashboard");
      } catch {
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      const cleanDigits = cleanPhoneNumber(phoneVal, selectedCountry.dialCode);
      if (!selectedCountry.regex.test(cleanDigits)) {
        toast.error(`Invalid phone number. Example for ${selectedCountry.name}: ${selectedCountry.example}`);
        setLoading(false);
        return;
      }
      const formattedPhone = `+${selectedCountry.dialCode}${cleanDigits}`;

      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone: formattedPhone, country: selectedCountry.iso }),
        });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message || "Signup failed. Please try again.");
          return;
        }
        if (data.alreadyExists) {
          toast.info("We recognised your details — logging you in automatically.");
        } else {
          toast.success("Thank you for contacting us. Your message has been received, and our team will get back to you shortly.");
        }
        onSuccess(data.sessionToken, data.user);
        onClose();
        navigate("/dashboard");
      } catch {
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-card border border-border shadow-xl p-0 rounded-2xl overflow-hidden">
        {/* Top gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-primary via-blue-500 to-primary w-full" />

        <div className="p-6">
          <DialogHeader className="mb-5 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Shield className="text-primary w-6 h-6" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold text-foreground">
              {tab === "login" ? "Welcome Back" : "Join Asset Circle"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              {tab === "login"
                ? "Enter your email to access your personalised portal."
                : "Create your free account and start your journey."}
            </DialogDescription>
          </DialogHeader>

          {/* Tab switcher */}
          <div className="grid grid-cols-2 gap-2 bg-secondary p-1 rounded-xl mb-6 border border-border">
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  tab === t ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={tab}
              initial={{ opacity: 0, x: tab === "login" ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: tab === "login" ? 10 : -10 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleAuth}
              className="space-y-4"
            >
              {tab === "signup" && (
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">Full Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      required type="text" placeholder="John Smith" value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    required type="email" placeholder="john@example.com" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {tab === "signup" && (
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">Phone Number</label>
                  <div className="flex gap-2">
                    <CountryDropdown selectedCountry={selectedCountry} onChange={setSelectedCountry} />
                    <div className="relative flex-1">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        required type="tel" placeholder={selectedCountry.example} value={phoneVal}
                        onChange={(e) => setPhoneVal(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Format: <span className="font-mono">+{selectedCountry.dialCode} {selectedCountry.example}</span>
                  </p>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 mt-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> {tab === "login" ? "Logging in..." : "Creating account..."}</>
                ) : (
                  <>{tab === "login" ? "Access My Portal" : "Get Started — It's Free"} <ArrowRight size={15} /></>
                )}
              </motion.button>
            </motion.form>
          </AnimatePresence>

          {/* Cross-tab prompt */}
          <p className="text-center text-xs text-muted-foreground mt-5">
            {tab === "login" ? (
              <>New here?{" "}
                <button onClick={() => setTab("signup")} className="text-primary font-semibold hover:underline">
                  Create a free account
                </button>
              </>
            ) : (
              <>Already have an account?{" "}
                <button onClick={() => setTab("login")} className="text-primary font-semibold hover:underline">
                  Login instead
                </button>
              </>
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
