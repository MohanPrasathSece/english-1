import PageBanner from "@/components/PageBanner";
import bannerImage from "@/assets/fullscreenimages/banner-about.jpg";
import SEO from "@/components/SEO";

export default function Terms() {
  return (
    <div>
      <SEO
        title="Terms & Conditions - Orchid Dental"
        description="Review our Terms & Conditions for accessing and using our digital services and portal."
        canonical="/terms"
      />
      <PageBanner
        image={bannerImage}
        title="Terms & Conditions"
        subtitle="Last Updated: July 2026"
        badge="Legal Information"
      />
      <div className="container mx-auto px-6 py-16 max-w-4xl text-slate-800">
        <div className="prose prose-slate max-w-none space-y-6 text-base">
          <p>
            Please read these terms and conditions carefully before using our website or portal services. By accessing or using our services, you agree to be bound by these terms.
          </p>

          <h2 className="text-xl font-bold mt-8 text-slate-900 border-b pb-2">1. Acceptance of Terms</h2>
          <p>
            By using our website, you agree to comply with and be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our site or portal services.
          </p>

          <h2 className="text-xl font-bold mt-8 text-slate-900 border-b pb-2">2. Eligibility</h2>
          <p>
            You must be at least 18 years of age to use this website, access the portal, or submit information to our CRM system.
          </p>

          <h2 className="text-xl font-bold mt-8 text-slate-900 border-b pb-2">3. Cryptocurrency Risk Disclosure</h2>
          <p>
            Our educational portal includes content regarding blockchain systems and digital asset basics. Cryptocurrencies are highly volatile assets. Investing in digital currencies carries substantial financial risk, and you could lose all of your invested capital.
          </p>

          <h2 className="text-xl font-bold mt-8 text-slate-900 border-b pb-2">4. No Investment or Financial Advice</h2>
          <p>
            The content provided on this website and within our portal is for informational and educational purposes only. It does not constitute financial, investment, or legal advice. We do not guarantee any returns or specific portfolio growth.
          </p>

          <h2 className="text-xl font-bold mt-8 text-slate-900 border-b pb-2">5. User Responsibilities & Acceptable Use</h2>
          <p>
            You are responsible for ensuring that the personal information and phone numbers you provide to our signup and contact forms are accurate. You agree not to use the website for any fraudulent or malicious purposes.
          </p>

          <h2 className="text-xl font-bold mt-8 text-slate-900 border-b pb-2">6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Orchid Dental and its affiliates shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of the website or educational portal resources.
          </p>

          <h2 className="text-xl font-bold mt-8 text-slate-900 border-b pb-2">7. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-xl font-bold mt-8 text-slate-900 border-b pb-2">8. Contact Us</h2>
          <p>
            For any queries or concerns regarding these terms, please contact us at: <a href="mailto:info@orchiddental.co.uk" className="text-primary hover:underline">info@orchiddental.co.uk</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
