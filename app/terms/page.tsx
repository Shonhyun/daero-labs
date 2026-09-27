import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Daero Labs",
  description: "The terms that apply when you use the Daero Labs website.",
};

export default function TermsOfService() {
  return (
    <LegalPage title="Terms of Service" updated="September 27, 2026">
      <p>
        These terms govern your use of the Daero Labs website. By using this website, you agree to them. If you do
        not agree, please do not use the site.
      </p>

      <h2>Use of the Website</h2>
      <p>
        You may browse this website and contact us for personal or business purposes. You agree not to misuse it,
        including by attempting to disrupt it, gain unauthorized access to it, or send spam or harmful content
        through our contact form.
      </p>

      <h2>Our Services</h2>
      <p>
        The information on this website describes our services in general terms and is not an offer. Any project we
        take on is governed by a separate written proposal or agreement, which sets out the scope, timeline, fees,
        and ownership of the work. If that agreement conflicts with these terms, the agreement prevails.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        The Daero Labs name, logo, and the content of this website belong to Daero Labs unless otherwise noted.
        Client names, logos, and products shown in our work belong to their respective owners and are displayed
        with permission. You may not copy or reuse our branding or content without our written consent.
      </p>

      <h2>Links to Other Websites</h2>
      <p>
        Our website may link to websites we do not control, such as our clients&apos; products. We are not responsible
        for their content, availability, or privacy practices.
      </p>

      <h2>Disclaimer</h2>
      <p>
        This website is provided &ldquo;as is.&rdquo; We work to keep its information accurate and up to date, but we
        do not guarantee that it is complete, error-free, or always available.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the extent permitted by law, Daero Labs is not liable for any indirect or consequential loss arising from
        your use of this website.
      </p>

      <h2>Governing Law</h2>
      <p>These terms are governed by the laws of the Republic of the Philippines.</p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these terms from time to time. When we do, we will change the &ldquo;Last updated&rdquo; date at
        the top of this page.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about these terms? Email us at <a href="mailto:daerolabs@gmail.com">daerolabs@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
