import { useState, FormEvent, useRef } from "react";
import { CalendarDays, Clock, User, Mail, Phone, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import FadeInView from "@/components/FadeInView";
import PageBanner from "@/components/PageBanner";
import SEO from "@/components/SEO";
import bannerImage from "@/assets/banner-booking.jpg";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const treatments = [
  "General Check-up & Clean",
  "Teeth Whitening",
  "Root Canal Treatment",
  "Orthodontics / Braces",
  "Tooth Extraction",
  "Composite Filling",
  "Porcelain Crown",
  "Emergency Dental Care",
  "Other",
];

const timeSlots = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  "5:00 PM", "5:30 PM",
];

const Booking = () => {
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    treatment: "",
    date: "",
    time: "",
    message: "",
    newPatient: "yes",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (SERVICE_ID === "YOUR_SERVICE_ID") {
      setSending(true);
      const subject = encodeURIComponent(`Appointment Request — ${form.treatment}`);
      const body = encodeURIComponent(
        `New Appointment Request\n\n` +
        `Name: ${form.name}\n` +
        `Email: ${form.email}\n` +
        `Phone: ${form.phone}\n` +
        `New Patient: ${form.newPatient === "yes" ? "Yes" : "No"}\n` +
        `Treatment: ${form.treatment}\n` +
        `Preferred Date: ${form.date}\n` +
        `Preferred Time: ${form.time}\n` +
        `Additional Notes: ${form.message || "None"}\n`
      );
      window.location.href = `mailto:info@orchiddental.co.uk?subject=${subject}&body=${body}`;

      setTimeout(() => {
        setSending(false);
        setSubmitted(true);
        toast.info("SMTP Not Configured - Opening email client instead.");
      }, 800);
      return;
    }

    setSending(true);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY)
      .then(() => {
        setSubmitted(true);
        toast.success("Thank you for contacting us. Your message has been received, and our team will get back to you shortly.");
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        toast.error("Failed to send booking. Please try again or call us.");
      })
      .finally(() => {
        setSending(false);
      });
  };

  if (submitted) {
    return (
      <div>
        <PageBanner image={bannerImage} title="Book an Appointment" badge="Booking" />
        <section className="py-20">
          <div className="container mx-auto px-6">
            <FadeInView>
              <div className="max-w-lg mx-auto text-center p-12 rounded-2xl bg-card shadow-medical">
                <div className="w-16 h-16 rounded-full bg-primary-muted flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Thank you!</h2>
                <p className="text-muted mb-6">
                  Your appointment request has been prepared. Please send the email that opened in your email client. We'll confirm your appointment within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", treatment: "", date: "", time: "", message: "", newPatient: "yes" }); }}
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 active:scale-95 transition-all duration-200"
                >
                  Book Another Appointment
                </button>
              </div>
            </FadeInView>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <SEO 
        title="Book Your Dental Appointment Online"
        description="Schedule your next dental visit at Orchid Dental London. Quick and easy online booking for check-ups, emergencies, and cosmetic consultations."
        canonical="/booking"
      />
      <PageBanner
        image={bannerImage}
        title="Book an Appointment"
        subtitle="Choose your preferred date, time, and treatment — we'll confirm within 24 hours."
        badge="Booking"
      />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <FadeInView className="lg:col-span-2">
              <form ref={formRef} onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card shadow-medical space-y-6">
                <h2 className="text-xl font-bold text-foreground mb-2">Your Details</h2>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
                      <User size={14} className="text-primary" /> Full Name
                    </label>
                    <input required value={form.name} onChange={e => update("name", e.target.value)} type="text" className="w-full px-4 py-3 rounded-lg bg-background border-0 text-foreground text-sm placeholder:text-muted focus:ring-2 focus:ring-primary/20 focus:outline-none transition" placeholder="John Smith" />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
                      <Phone size={14} className="text-primary" /> Phone
                    </label>
                    <input required value={form.phone} onChange={e => update("phone", e.target.value)} type="tel" className="w-full px-4 py-3 rounded-lg bg-background border-0 text-foreground text-sm placeholder:text-muted focus:ring-2 focus:ring-primary/20 focus:outline-none transition font-mono" placeholder="0412 345 678" />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
                    <Mail size={14} className="text-primary" /> Email
                  </label>
                  <input required value={form.email} onChange={e => update("email", e.target.value)} type="email" className="w-full px-4 py-3 rounded-lg bg-background border-0 text-foreground text-sm placeholder:text-muted focus:ring-2 focus:ring-primary/20 focus:outline-none transition" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Are you a new patient?</label>
                  <div className="flex gap-4">
                    {["yes", "no"].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => update("newPatient", val)}
                        className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          form.newPatient === val
                            ? "bg-primary text-primary-foreground"
                            : "bg-background text-muted hover:text-foreground"
                          }`}
                      >
                        {val === "yes" ? "Yes, I'm new" : "No, returning patient"}
                      </button>
                    ))}
                  </div>
                </div>

                <hr className="border-border" />

                <h2 className="text-xl font-bold text-foreground mb-2">Appointment Details</h2>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
                    <FileText size={14} className="text-primary" /> Treatment
                  </label>
                  <select
                    required
                    value={form.treatment}
                    onChange={e => update("treatment", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-background border-0 text-foreground text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none transition appearance-none"
                  >
                    <option value="">Select a treatment</option>
                    {treatments.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
                      <CalendarDays size={14} className="text-primary" /> Preferred Date
                    </label>
                    <input
                      required
                      value={form.date}
                      onChange={e => update("date", e.target.value)}
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 rounded-lg bg-background border-0 text-foreground text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
                      <Clock size={14} className="text-primary" /> Preferred Time
                    </label>
                    <select
                      required
                      value={form.time}
                      onChange={e => update("time", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-background border-0 text-foreground text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none transition appearance-none"
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
                    <FileText size={14} className="text-primary" /> Additional Notes
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => update("message", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-background border-0 text-foreground text-sm placeholder:text-muted focus:ring-2 focus:ring-primary/20 focus:outline-none transition resize-none"
                    placeholder="Any specific concerns or requests..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 active:scale-95 transition-all duration-200 disabled:opacity-50"
                >
                  {sending ? "Preparing..." : "Confirm Appointment Request"}
                </button>

                <p className="text-xs text-muted text-center">
                  This will open your email client. We'll confirm your appointment within 24 hours.
                </p>
              </form>
            </FadeInView>

            {/* Sidebar */}
            <FadeInView delay={0.15}>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-card shadow-medical">
                  <h3 className="font-semibold text-foreground mb-4">Why choose Orchid Dental?</h3>
                  <ul className="space-y-3 text-sm text-muted">
                    {[
                      "Same-day emergency appointments",
                      "Interest-free payment plans available",
                      "All health funds accepted & processed on-site",
                      "State-of-the-art digital scanning technology",
                      "Gentle, anxiety-free environment",
                      "Over 15 years of experience",
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-card shadow-medical">
                  <h3 className="font-semibold text-foreground mb-3">Contact Us Directly</h3>
                  <div className="space-y-2 text-base text-muted">
                    <p className="font-mono">020 8459 2626</p>
                    <p>info@orchiddental.co.uk</p>
                    <p>158–160 High Road, London NW10 2PB</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-primary-muted">
                  <h3 className="font-semibold text-foreground mb-2">Opening Hours</h3>
                  <div className="text-base text-muted space-y-1">
                    <p>Monday – Friday: 9:00 AM – 1:00 PM, 2:00 PM – 5:00 PM</p>
                    <p>Saturday: Closed</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
