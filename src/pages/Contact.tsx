import { useState, FormEvent, useEffect } from "react";
import { Mail, MessageSquare, CheckCircle2, Loader2, HelpCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import CountryDropdown, { countries, Country, cleanPhoneNumber } from "../components/CountryDropdown";

interface ContactProps {
  user?: any;
}

const Contact = ({ user }: ContactProps) => {
  const [sending, setSending] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhoneVal(user.phone || "");
      const found = countries.find(c => c.iso === user.country);
      if (found) setSelectedCountry(found);
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const cleanDigits = cleanPhoneNumber(phoneVal, selectedCountry.dialCode);
    if (!selectedCountry.regex.test(cleanDigits)) {
      toast.error(`Invalid phone number for ${selectedCountry.name}. Example: ${selectedCountry.example}`);
      setSending(false);
      return;
    }

    const formattedPhone = `+${selectedCountry.dialCode}${cleanDigits}`;

    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: formattedPhone, country: selectedCountry.iso, message }),
      });
      const data = await resp.json();

      if (!resp.ok) {
        toast.error(data.message || "We couldn't process your enquiry. Please review your details and try again.");
        return;
      }
      if (data.alreadyExists) {
        toast.info(data.message || "It looks like you've already contacted us. We've recognized your details.");
      } else {
        setShowSuccessDialog(true);
      }
      setMessage("");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEO
        title="Contact VertexIQ — Digital Asset Enquiries"
        description="Get in touch with the VertexIQ team regarding digital asset custody, yield optimization, or investment enquiries."
        canonical="/contact"
      />

      {/* Hero banner */}
      <div className="relative py-32 flex items-center justify-center overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-slate-950" />
        <div className="relative z-10 text-center px-6">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Contact Our Desk</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Our team of digital asset specialists is available to assist you with any enquiry.</p>
        </div>
      </div>

      {/* Contact form + info */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">

            {/* Info cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <Mail size={20} className="text-primary mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">Email</p>
                    <a href="mailto:support@vertexiq.com" className="text-sm text-slate-400 hover:text-primary transition-colors">
                      support@vertexiq.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <MessageSquare size={20} className="text-primary mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">Response Time</p>
                    <p className="text-sm text-slate-400">Our team responds within 24 business hours.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <HelpCircle size={20} className="text-primary mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">Common Questions</p>
                    <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                      <li>Digital asset custody enquiries</li>
                      <li>AI yield strategies</li>
                      <li>Cold storage security protocols</li>
                      <li>Account onboarding assistance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-6">Send a Message</h2>
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Full Name</label>
                    <input required value={name} onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-primary transition-all"
                      placeholder="John Smith" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Phone</label>
                    <div className="flex gap-2">
                      <CountryDropdown selectedCountry={selectedCountry} onChange={setSelectedCountry} />
                      <input required type="tel" value={phoneVal} onChange={e => setPhoneVal(e.target.value)}
                        className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-primary transition-all font-mono"
                        placeholder={selectedCountry.example} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Email Address</label>
                    <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-primary transition-all"
                      placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Message <span className="text-slate-600 normal-case">(optional)</span></label>
                    <textarea rows={4} value={message} onChange={e => setMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-primary transition-all resize-none"
                      placeholder="Describe your enquiry..." />
                  </div>
                  <button type="submit" disabled={sending}
                    className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                    {sending && <Loader2 size={16} className="animate-spin" />}
                    {sending ? "Sending..." : "Submit Enquiry"}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md text-center p-8 bg-slate-900 border border-slate-800 text-white">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-950 border border-green-500/30 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl text-center text-white">Enquiry Received</DialogTitle>
              <DialogDescription className="text-center text-slate-400 pt-2">
                Thank you for reaching out. A VertexIQ specialist will contact you shortly.
              </DialogDescription>
            </DialogHeader>
            <button onClick={() => setShowSuccessDialog(false)}
              className="mt-4 px-8 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:brightness-110 transition-all">
              Done
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;
