import SEO from "@/components/SEO";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Privacy Policy - Asset Circle"
        description="Read Asset Circle's Privacy Policy to understand how we collect, use, and protect your personal information."
        canonical="/privacy-policy"
      />

      <div className="relative py-28 flex items-center justify-center border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="text-center px-6">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-extrabold text-foreground mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm">Last Updated: July 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3 border-b border-border pb-2">1. Information We Collect</h2>
            <p>When you register or contact us through Asset Circle, we collect personal information including your full name, email address, phone number, and country of residence. We also collect technical data such as your IP address and browser type for security and analytics purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3 border-b border-border pb-2">2. How We Use Your Information</h2>
            <p>Your data is used to process your registration, verify your identity, deliver our digital asset platform services, and respond to enquiries. We do not sell your personal data to any third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3 border-b border-border pb-2">3. CRM Processing</h2>
            <p>When you submit a contact or registration form, your information is securely transmitted to our CRM system for lead management and client relationship purposes. This is done server-side only — your CRM credentials and tokens are never exposed to the browser.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3 border-b border-border pb-2">4. Cookies & Tracking</h2>
            <p>We use session cookies to maintain your authenticated state after login. We may also use analytics cookies to understand how our platform is used. You may disable cookies in your browser settings, though some features may not function correctly.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3 border-b border-border pb-2">5. Data Storage & Security</h2>
            <p>User data is stored in private, encrypted cloud storage using Vercel Blob. Access is restricted exclusively to server-side processes. Session tokens are cryptographically generated and invalidated upon logout. We apply industry-standard security protocols across all systems.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3 border-b border-border pb-2">6. Data Retention</h2>
            <p>We retain your personal information for as long as your account remains active or as required to fulfil legal obligations. You may request deletion of your account and associated data at any time.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3 border-b border-border pb-2">7. Your Rights</h2>
            <p>You have the right to access, rectify, or erase your personal data. You may also request restrictions on processing or object to the use of your data for marketing purposes. To exercise these rights, contact us at the email below.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3 border-b border-border pb-2">8. International Transfers</h2>
            <p>Your data may be processed in countries outside your own. We ensure adequate safeguards are in place, including reliance on standard contractual clauses where required by applicable law.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-foreground mb-3 border-b border-border pb-2">9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or how we handle your data, please contact us at: <a href="mailto:privacy@assetcircle.com" className="text-primary hover:underline">privacy@assetcircle.com</a></p>
          </section>

        </div>
      </div>
    </div>
  );
}
