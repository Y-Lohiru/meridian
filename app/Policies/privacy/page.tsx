import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import {
  MERIDIAN_CONTACT as C,
  POLICY_LAST_UPDATED,
} from "@/components/legal/contact";

export const metadata: Metadata = {
  title: "Privacy Policy | Meridian",
  description:
    "How Meridian collects, uses and protects your personal data when you shop for shoes with us in Sri Lanka.",
};

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    content: (
      <>
        <p>
          Meridian is an online shoe store operated by {C.legalName} (
          &ldquo;Meridian&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). We sell
          and deliver footwear to customers within Sri Lanka.
        </p>
        <p>
          We are the controller of the personal data described in this policy.
          We handle it in line with the Personal Data Protection Act No. 9 of
          2022 of Sri Lanka (&ldquo;PDPA&rdquo;) and other applicable laws.
        </p>
      </>
    ),
  },
  {
    id: "data-we-collect",
    title: "Information we collect",
    content: (
      <>
        <h3>Information you give us</h3>
        <ul>
          <li>
            <strong>Account details:</strong> your email address and password
            when you create a Meridian account. Passwords are stored in
            encrypted (hashed) form, and we can never see them.
          </li>
          <li>
            <strong>Order and delivery details:</strong> your name, delivery
            address, city, postcode, phone number and email address.
          </li>
          <li>
            <strong>Shopping details:</strong> the shoes, sizes and quantities
            you order, your delivery choice, and whether you asked for gift
            wrapping.
          </li>
          <li>
            <strong>Payment details:</strong> your chosen payment method (cash
            on delivery or bank transfer). If you pay by bank transfer, we
            collect the receipt you upload, which may show your name, bank,
            account details and the transfer reference. We do not collect or
            store card numbers.
          </li>
          <li>
            <strong>Reviews and messages:</strong> product reviews and ratings
            you post, and anything you send us when you contact customer
            support.
          </li>
          <li>
            <strong>Marketing preferences:</strong> whether you agreed to
            receive emails about new collections and private sales.
          </li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li>
            Technical data such as your IP address, browser type, device type
            and the pages you visit, which we use to keep the site secure and
            working.
          </li>
          <li>
            Data held in cookies and similar browser storage, such as your
            sign-in session and the items in your bag. See{" "}
            <a href="#cookies">Cookies</a> below.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    content: (
      <>
        <p>We use your personal data to:</p>
        <ul>
          <li>
            process your orders and deliver them to you, including calling or
            texting you to confirm a cash-on-delivery order before we dispatch
            it;
          </li>
          <li>check bank transfer payments against the receipts you upload;</li>
          <li>
            manage your account and show you your order history and delivery
            status;
          </li>
          <li>
            handle returns, exchanges (for example, a different size) and
            refunds;
          </li>
          <li>reply to your questions and complaints;</li>
          <li>
            publish the product reviews you choose to post, along with the name
            you give;
          </li>
          <li>
            send you news about new collections and private sales, but only if
            you have opted in;
          </li>
          <li>
            prevent fraud, keep our site secure, and fix technical problems;
          </li>
          <li>
            meet our legal duties, such as keeping tax and accounting records.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "legal-basis",
    title: "Our legal grounds for processing",
    content: (
      <>
        <p>Under the PDPA, we process your personal data on these grounds:</p>
        <ul>
          <li>
            <strong>Contract:</strong> to set up your account and to fulfil,
            deliver and support your orders.
          </li>
          <li>
            <strong>Consent:</strong> for marketing emails. You can withdraw
            consent at any time.
          </li>
          <li>
            <strong>Legal obligation:</strong> to keep financial records and to
            respond to lawful requests from authorities.
          </li>
          <li>
            <strong>Legitimate interests:</strong> to prevent fraud, keep our
            platform secure and improve our service, in ways that do not
            override your rights.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    content: (
      <>
        <p>
          <strong>We do not sell your personal data.</strong> We only share it
          where needed to run our service:
        </p>
        <ul>
          <li>
            <strong>Courier and delivery partners</strong> in Sri Lanka receive
            your name, address and phone number so they can deliver your order
            and collect cash-on-delivery payments.
          </li>
          <li>
            <strong>Hosting and database providers</strong> (for example,
            Supabase for accounts and data storage) store data for us under
            confidentiality and security obligations. Some of these providers
            may store data on servers outside Sri Lanka. When they do, we take
            reasonable steps to make sure your data is protected as the PDPA
            requires.
          </li>
          <li>
            <strong>Email service providers</strong> send order confirmations
            and, if you have opted in, marketing emails.
          </li>
          <li>
            <strong>Authorities and professional advisers</strong>, where the
            law requires it or where we need to protect our rights, our
            customers or the public.
          </li>
          <li>
            <strong>A buyer or successor</strong> if Meridian is sold or
            restructured. Your data would remain covered by this policy.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <>
        <p>
          We use essential cookies and browser storage to keep you signed in,
          remember what is in your bag, and keep the site secure. The site
          cannot work properly without them.
        </p>
        <p>
          If we add analytics or advertising cookies in the future, we will
          update this policy. Where the law requires it, we will ask for your
          consent first. You can block or delete cookies in your browser
          settings, but parts of the site, such as signing in and checkout, may
          then stop working.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep your data",
    content: (
      <ul>
        <li>
          <strong>Account data</strong> is kept while your account is open. When
          you ask us to delete your account, we delete it or make it anonymous,
          unless we need to keep some of it for the reasons below.
        </li>
        <li>
          <strong>Order and payment records</strong>, including bank transfer
          receipts, are kept for as long as Sri Lankan tax and accounting laws
          require, which is usually up to 6 years.
        </li>
        <li>
          <strong>Marketing data</strong> is kept until you unsubscribe or
          withdraw your consent.
        </li>
        <li>
          <strong>Customer support messages</strong> are kept for up to 2 years
          after your issue is resolved.
        </li>
      </ul>
    ),
  },
  {
    id: "security",
    title: "How we protect your data",
    content: (
      <>
        <p>
          We protect your data with technical and organisational measures. These
          include encrypted (HTTPS) connections, hashed passwords, access
          controls that limit staff and admin access to what each role needs,
          and secure cloud infrastructure.
        </p>
        <p>
          No system is completely secure. If we become aware of a breach that
          affects your personal data, we will notify you and the Data Protection
          Authority of Sri Lanka as the law requires. Please keep your password
          private, and contact us straight away if you think someone else has
          used your account.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <>
        <p>Under the PDPA, you have the right to:</p>
        <ul>
          <li>access the personal data we hold about you;</li>
          <li>have inaccurate or incomplete data corrected;</li>
          <li>
            have your data erased, subject to our legal duties to keep records;
          </li>
          <li>withdraw consent, for example to marketing emails;</li>
          <li>object to certain kinds of processing;</li>
          <li>
            ask for a review of any decision made solely by automated means
            that significantly affects you.
          </li>
        </ul>
        <p>
          To use any of these rights, email{" "}
          <a href={`mailto:${C.privacyEmail}`}>{C.privacyEmail}</a>. We may need
          to confirm your identity first. We will respond within the time limit
          the law sets. You can unsubscribe from marketing emails at any time
          using the link in each email.
        </p>
        <p>
          If you are not happy with how we have handled your data, you can
          complain to the Data Protection Authority of Sri Lanka.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    content: (
      <p>
        You must be at least 18 to create an account or place an order. A
        parent or guardian may order children&rsquo;s shoes on a child&rsquo;s
        behalf. We do not knowingly collect personal data directly from anyone
        under 18. If you think we have, contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this policy from time to time. The &ldquo;Last
        updated&rdquo; date at the top of this page shows when it last changed.
        If we make significant changes, we will tell you by email or with a
        notice on the site. Please also read our{" "}
        <Link href="/Policies/terms">Terms &amp; Conditions</Link>.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <>
        <p>For questions about this policy or your personal data, contact:</p>
        <ul>
          <li>
            <strong>{C.legalName}</strong>, {C.address}
          </li>
          <li>
            Email: <a href={`mailto:${C.privacyEmail}`}>{C.privacyEmail}</a>
          </li>
          <li>
            Phone: <a href={`tel:${C.phone.replace(/\s/g, "")}`}>{C.phone}</a>{" "}
            ({C.hours})
          </li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPage
      eyebrow="Policies"
      title="Privacy Policy"
      lastUpdated={POLICY_LAST_UPDATED}
      intro={
        <p>
          This policy explains what personal data Meridian collects when you
          browse our site, create an account or buy shoes from us, how we use
          it, and the rights you have over it.
        </p>
      }
      sections={sections}
    />
  );
}
