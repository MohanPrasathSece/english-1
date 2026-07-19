import { useState, FormEvent, useRef, useEffect } from "react";
import { Phone as PhoneIcon, Mail, MapPin, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import FadeInView from "@/components/FadeInView";
import PageBanner from "@/components/PageBanner";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import bannerImage from "@/assets/banner-contact.jpg";
import CountryDropdown, { countries, Country, cleanPhoneNumber } from "../components/CountryDropdown";

interface ContactProps {
  user?: any;
}

const Contact = ({ user }: ContactProps) => {
  const [sending, setSending] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [message, setMessage] = useState("");

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhoneVal(user.phone || "");
      const foundCountry = countries.find(c => c.iso === user.country);
      if (foundCountry) {
        setSelectedCountry(foundCountry);
      }
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      const resp = await fetch("/api/contact", {
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

      const data = await resp.json();
      if (!resp.ok) {
        toast.error(data.message || "We couldn't process your enquiry with the information provided.");
        setSending(false);
        return;
      }

      if (data.alreadyExists) {
        toast.info(data.message || "It looks like you've already contacted us. We've recognized your details and will continue with your request.");
      } else {
        setShowSuccessDialog(true);
      }

      // Reset form message
      setMessage("");
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again or use the phone number.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <SEO 
        title="Contact Us - Orchid Dental London"
        description="Get in touch with Orchid Dental Practice in Willesden, London NW10. Call us at 020 8459 2626 or book your appointment online."
        canonical="/contact"
      />
      <PageBanner
        image={bannerImage}
        title="Contact Us"
        subtitle="We'd love to hear from you. Get in touch today."
        badge="Get In Touch"
      />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-12 lg:grid lg:grid-cols-2 lg:gap-12 lg:space-y-0">
            {/* Personal Details - First on Mobile */}
            <FadeInView>
              <div className="space-y-6">
                <div className="p-8 rounded-2xl bg-card shadow-medical space-y-4">
                  <div className="flex items-start gap-3">
                    <PhoneIcon size={20} className="text-primary mt-0.5" />
                    <div>
                      <p className="text-base font-medium text-foreground">Phone</p>
                      <a href="tel:02084592626" className="text-base text-muted font-mono hover:text-primary transition-colors">020 8459 2626</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="text-primary mt-0.5" />
                    <div>
                      <p className="text-base font-medium text-foreground">Email</p>
                      <a href="mailto:info@orchiddental.co.uk" className="text-base text-muted hover:text-primary transition-colors">info@orchiddental.co.uk</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-primary mt-0.5" />
                    <div>
                      <p className="text-base font-medium text-foreground">Address</p>
                      <p className="text-base text-muted">158–160 High Road, London NW10 2PB</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={20} className="text-primary mt-0.5" />
                    <div>
                      <p className="text-base font-medium text-foreground">Hours</p>
                      <p className="text-base text-muted">Monday – Friday: 9:00 AM – 1:00 PM, 2:00 PM – 5:00 PM</p>
                      <p className="text-base text-muted">Saturday: Closed</p>
                      <p className="text-base text-muted">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInView>

            {/* Form - Second on Mobile */}
            <FadeInView delay={0.15}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-foreground mb-2">Send us a message</h2>
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input 
                      required 
                      name="name" 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" 
                      placeholder="John Smith" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <div className="flex gap-2">
                      <CountryDropdown selectedCountry={selectedCountry} onChange={setSelectedCountry} />
                      <input 
                        required 
                        name="phone" 
                        type="tel" 
                        value={phoneVal}
                        onChange={(e) => setPhoneVal(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-mono" 
                        placeholder={selectedCountry.example} 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input 
                      required 
                      name="email" 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" 
                      placeholder="john@example.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea 
                      required 
                      name="message" 
                      rows={4} 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm resize-none" 
                      placeholder="Tell us about your needs..." 
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 active:scale-95 transition-all duration-200 disabled:opacity-50 text-base flex items-center justify-center gap-2"
                  >
                    {sending && <Loader2 size={16} className="animate-spin" />}
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <FadeInView>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <p className="text-base font-semibold text-primary uppercase tracking-wider mb-3">Find Us</p>
              <h2 className="text-foreground mb-4">Visit Our Practice</h2>
              <p className="text-base text-muted max-w-2xl mx-auto mb-8">
                Located in Willesden, North West London. Our modern practice is a short distance from Dollis Hill and Willesden Green tube station. Buses that serve our practice are numbers 52, 98, 260, 266, 302 and 460.
              </p>
              <p className="text-sm text-secondary/60 max-w-2xl mx-auto">
                Areas we serve: <span className="font-semibold">Dollis Hill, Willesden, Brondesbury, Queens Park & Cricklewood</span>
              </p>
            </div>
          </FadeInView>
          <FadeInView delay={0.1}>
            <div className="rounded-2xl overflow-hidden shadow-medical-lg max-w-6xl mx-auto h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.129349878369!2d-0.2343988!3d51.547527099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761052ca717043%3A0x66d4a3228fac5d1e!2sOrchid%20Dental!5e0!3m2!1sen!2sin!4v1773546596060!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </FadeInView>
        </div>
      </section>

      <CTASection title="Have questions about our services?" subtitle="Get in touch with our team for personalized dental care advice." buttonText="Send Message" to="/contact#contact-form" />

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md text-center p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">Message Sent!</DialogTitle>
              <DialogDescription className="text-center text-base pt-2">
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
};

export default Contact;
