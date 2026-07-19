import { useState, FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Mail, User, Phone, CheckCircle } from "lucide-react";
import CountryDropdown, { countries, Country, cleanPhoneNumber } from "./CountryDropdown";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (token: string, user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]); // default CH

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
            toast.error(data.message || "Account not found. Please sign up first.");
          } else {
            toast.error(data.message || "Login failed. Please try again.");
          }
          setLoading(false);
          return;
        }

        toast.success("Welcome back! Logged in successfully.");
        onSuccess(data.sessionToken, data.user);
        onClose();
      } catch (err) {
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      // Signup Flow
      const cleanDigits = cleanPhoneNumber(phoneVal, selectedCountry.dialCode);
      const isValid = selectedCountry.regex.test(cleanDigits);

      if (!isValid) {
        toast.error(`Invalid phone number. Example for ${selectedCountry.name}: ${selectedCountry.example}`);
        setLoading(false);
        return;
      }

      // Format phone as +[dialCode][digits]
      const formattedPhone = `+${selectedCountry.dialCode}${cleanDigits}`;

      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            phone: formattedPhone,
            country: selectedCountry.iso,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          if (data.errorType === "invalid_lead") {
            toast.error(data.message || "We couldn't process your enquiry with the information provided. Please review your details and try again.");
          } else {
            toast.error(data.message || "Signup failed. Please try again.");
          }
          setLoading(false);
          return;
        }

        if (data.alreadyExists) {
          toast.info("It looks like you've already contacted us. We've recognized your details and will continue with your request.");
        } else {
          toast.success("Signup completed! Your account is ready.");
        }

        onSuccess(data.sessionToken, data.user);
        onClose();
      } catch (err) {
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-card border border-border shadow-lg p-6 rounded-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            Asset <span className="text-primary">Circle</span> Portal
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Access your personalised digital asset dashboard.
          </DialogDescription>
        </DialogHeader>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 gap-2 bg-secondary p-1.5 rounded-xl mb-6 border border-border">
          <button
            type="button"
            onClick={() => setTab("login")}
            className={`py-2 text-sm font-semibold rounded-lg transition-all ${
              tab === "login"
                ? "bg-card text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setTab("signup")}
            className={`py-2 text-sm font-semibold rounded-lg transition-all ${
              tab === "signup"
                ? "bg-card text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {tab === "signup" && (
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                required
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {tab === "signup" && (
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">Phone Number</label>
              <div className="flex gap-2">
                <CountryDropdown selectedCountry={selectedCountry} onChange={setSelectedCountry} />
                <div className="relative flex-1">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    required
                    type="tel"
                    placeholder={selectedCountry.example}
                    value={phoneVal}
                    onChange={(e) => setPhoneVal(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                  />
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Format for {selectedCountry.name}: <span className="font-mono">+{selectedCountry.dialCode} {selectedCountry.example}</span>
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading
              ? tab === "login"
                ? "Checking credentials..."
                : "Registering lead..."
              : tab === "login"
              ? "Access Portal"
              : "Register Account"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
