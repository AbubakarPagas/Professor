import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/page-hero'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for the official website of Professor Mohammed Dauda.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Privacy Policy"
        description="How this website collects, uses, and protects your personal information."
      />
      <div className="bg-white">
        <div className="container py-16 max-w-3xl">
          <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-navy-700">

            <p className="lead text-charcoal/75">
              This privacy policy explains how the official website of Professor Mohammed Dauda
              (<strong>profdauda.com</strong>) handles any personal information you provide.
              This site is operated solely for informational and professional purposes.
            </p>

            <p className="text-xs text-charcoal/40">Last updated: {new Date().getFullYear()}</p>

            <h2>Information We Collect</h2>
            <p>We collect personal information only when you voluntarily provide it — for example, when you submit the contact form. The information collected includes:</p>
            <ul>
              <li>Your name</li>
              <li>Your email address</li>
              <li>The subject and content of your message</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>Information you submit through the contact form is used exclusively to respond to your enquiry. Your data is not shared with third parties, sold, or used for marketing purposes.</p>

            <h2>Data Storage</h2>
            <p>Contact messages are stored securely using Google Firebase (Firestore), which operates within Google&apos;s privacy and security framework. Messages are accessible only to authorised administrators.</p>

            <h2>Cookies</h2>
            <p>This website does not use tracking cookies or third-party analytics. Firebase Authentication may set session cookies solely to maintain admin login sessions.</p>

            <h2>Third-Party Links</h2>
            <p>This website may contain links to external academic profiles (Google Scholar, ResearchGate, ORCID, LinkedIn). We are not responsible for the privacy practices of those platforms.</p>

            <h2>Your Rights</h2>
            <p>You may request deletion of any personal data you submitted via the contact form by emailing <a href="mailto:contact@profdauda.com">contact@profdauda.com</a>. Requests will be honoured within 30 days.</p>

            <h2>Changes to This Policy</h2>
            <p>This policy may be updated periodically. The &ldquo;last updated&rdquo; date at the top of this page will reflect any changes.</p>

            <h2>Contact</h2>
            <p>For questions regarding this privacy policy, please contact us at <a href="mailto:contact@profdauda.com">contact@profdauda.com</a>.</p>
          </div>
        </div>
      </div>
    </>
  )
}
