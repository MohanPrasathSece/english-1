import PageBanner from "@/components/PageBanner";
import bannerImage from "@/assets/fullscreenimages/banner-about.jpg";
import SEO from "@/components/SEO";

export default function PrivacyPolicy() {
  return (
    <div>
      <SEO
        title="Privacy Policy - Orchid Dental"
        description="Read our Privacy Policy to understand how we collect, process, and protect your personal information."
        canonical="/privacy-policy"
      />
      <PageBanner
        image={bannerImage}
        title="Privacy Policy"
        subtitle="Last Updated: July 2026"
        badge="Legal Information"
      />
      <div className="container mx-auto px-6 py-16 max-w-4xl text-slate-800">
        <div className="prose prose-slate max-w-none space-y-6 text-base">
          <p>
            Welcome to Orchid Dental. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>

          <h2 className="text-xl font-bold mt-8 text-slate-900 border-b pb-2">1. Information Collection</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address, telephone numbers, and country.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 text-slate-900 border-b pb-2">2. Data Usage & CRM Processing</h2>
          <p>
            When you complete a form on our website, your information is submitted to our secure backend CRM system. The CRM manages lead notifications and helps our support team contact you directly regarding your inquiry.
          </p>

          <h2 className="text-xl font-bold mt-8 text-slate-900 border-b pb-2">3. Cookies and Tracking</h2>
          <p>
            We use cookies to improve your user experience, analyze site traffic, and understand where our audience is coming from. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.
          </p>

          <h2 className="text-xl font-bold mt-8 text-slate-900 border-b pb-2">4. Data Retention</h2>
          <p>
            We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
          </p>

          <h2 className="text-xl font-bold mt-8 text-slate-900 border-b pb-2">5. User Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, or restriction of your personal data.
          </p>

          <h2 className="text-xl font-bold mt-8 text-slate-900 border-b pb-2">6. Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
          </p>

          <h2 className="text-xl font-bold mt-8 text-slate-900 border-b pb-2">7. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:info@orchiddental.co.uk" className="text-primary hover:underline">info@orchiddental.co.uk</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
