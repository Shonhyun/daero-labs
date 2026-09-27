import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Daero Labs",
  description: "How Daero Labs collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" updated="September 27, 2026">
      <p>
        Daero Labs (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This policy explains
        what information we collect when you visit our website or contact us, how we use it, and the choices you
        have. We process personal information in accordance with the Data Privacy Act of 2012 (Republic Act No.
        10173) of the Philippines.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>
          <strong>Information you give us.</strong> When you use our contact form or email us, we receive your name,
          email address, and the contents of your message.
        </li>
        <li>
          <strong>Technical information.</strong> Like most websites, our hosting provider automatically processes
          basic technical data such as your IP address, browser type, and the pages you request, so the site can be
          delivered and kept secure.
        </li>
        <li>
          <strong>Preferences stored on your device.</strong> We save your light or dark theme choice in your
          browser&apos;s local storage. It never leaves your device.
        </li>
      </ul>
      <p>We do not use advertising cookies, and we do not sell your personal information.</p>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To reply to your inquiry and discuss a potential project with you.</li>
        <li>To prepare proposals and deliver services you engage us for.</li>
        <li>To operate, maintain, and secure our website.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2>Third-Party Services</h2>
      <p>
        We rely on a small number of trusted providers to run this website: Vercel hosts the site, Google (Gmail)
        delivers messages sent through our contact form, and LottieFiles serves some of the animations you see on
        our pages. These providers only process your information as needed to provide their services to us.
      </p>

      <h2>How Long We Keep Your Information</h2>
      <p>
        We keep inquiry messages only as long as needed to respond to you and manage our working relationship, or as
        required by law. You can ask us to delete them at any time.
      </p>

      <h2>How We Protect Your Information</h2>
      <p>
        We use reasonable organizational and technical measures, including encrypted connections (HTTPS), to
        protect your information. No method of transmission over the internet is completely secure, but we work to
        protect your data and will notify you and the proper authorities of any breach as required by law.
      </p>

      <h2>Your Rights</h2>
      <p>
        Under the Data Privacy Act, you have the right to be informed about how your data is processed, to access
        and correct it, to object to its processing, to have it erased or blocked, and to file a complaint with the
        National Privacy Commission. To exercise any of these rights, email us at the address below.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. When we do, we will change the &ldquo;Last updated&rdquo; date
        at the top of this page.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about this policy or your data? Email us at{" "}
        <a href="mailto:daerolabs@gmail.com">daerolabs@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
