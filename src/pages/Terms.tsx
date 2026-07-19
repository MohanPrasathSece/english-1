import SEO from "@/components/SEO";

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEO
        title="Terms & Conditions - VertexIQ"
        description="Review VertexIQ's Terms & Conditions before using our digital asset platform and client portal."
        canonical="/terms"
      />

      <div className="relative py-28 flex items-center justify-center border-b border-slate-900 bg-gradient-to-b from-blue-900/10 to-slate-950">
        <div className="text-center px-6">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-extrabold text-white mb-3">Terms & Conditions</h1>
          <p className="text-slate-400 text-sm">Last Updated: July 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <div className="space-y-10 text-sm text-slate-300 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">1. Acceptance of Terms</h2>
            <p>By accessing VertexIQ's website or client portal, you agree to be fully bound by these Terms & Conditions. If you do not agree, you must immediately cease use of the platform.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">2. Eligibility</h2>
            <p>You must be at least 18 years of age and legally permitted to participate in financial services in your jurisdiction to use this platform. By registering, you confirm you meet these requirements.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">3. Website Purpose</h2>
            <p>VertexIQ provides educational content, AI market analysis tools, and digital asset portfolio advisory services. All content is for informational and research purposes only.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">4. Cryptocurrency Risk Disclosure</h2>
            <p>Digital assets including Bitcoin, Ethereum, and other cryptocurrencies are highly volatile instruments. The value of your investment may increase or decrease significantly. Past performance is not indicative of future results. You may lose some or all of your invested capital.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">5. No Financial or Investment Advice</h2>
            <p>Nothing on this platform constitutes financial, investment, legal, or tax advice. VertexIQ does not make any guarantee of returns or profits. You are solely responsible for your own investment decisions.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">6. User Responsibilities & Acceptable Use</h2>
            <p>You agree to provide accurate information when registering or submitting contact forms. You must not use this platform for any fraudulent, illegal, or unauthorized purpose, including attempting to gain unauthorized access to our systems.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">7. Intellectual Property</h2>
            <p>All content, trademarks, logos, and technology on this platform are the exclusive intellectual property of VertexIQ. Unauthorized reproduction or distribution is strictly prohibited.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by applicable law, VertexIQ and its affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of, or inability to use, the platform.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">9. Privacy Reference</h2>
            <p>Your use of this platform is also governed by our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>, which is incorporated into these Terms by reference.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">10. Governing Law & Disputes</h2>
            <p>These Terms shall be governed by the laws of the United Kingdom. Any disputes arising under these Terms shall first be subject to good-faith mediation before being referred to arbitration or court proceedings.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">11. Contact</h2>
            <p>For questions or concerns regarding these Terms, contact us at: <a href="mailto:legal@vertexiq.com" className="text-primary hover:underline">legal@vertexiq.com</a></p>
          </section>

        </div>
      </div>
    </div>
  );
}
