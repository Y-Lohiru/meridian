import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import {
  MERIDIAN_CONTACT as C,
  POLICY_LAST_UPDATED,
} from "@/components/legal/contact";

export const metadata: Metadata = {
  title: "Terms & Conditions | Meridian",
  description:
    "The terms that apply when you use Meridian and buy shoes from us for delivery within Sri Lanka.",
};

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About these terms",
    content: (
      <>
        <p>
          These terms apply when you use the Meridian website and when you buy
          from it. The website is operated by {C.legalName}, {C.address}{" "}
          (&ldquo;Meridian&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;).
        </p>
        <p>
          By using the site or placing an order, you agree to these terms and
          to our <Link href="/Policies/privacy">Privacy Policy</Link>. If you do
          not agree, please do not use the site. Nothing in these terms limits
          your statutory rights under the Consumer Affairs Authority Act No. 9
          of 2003 or any other Sri Lankan law.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility and your account",
    content: (
      <ul>
        <li>You must be at least 18 years old to create an account or order.</li>
        <li>
          Please give accurate details and keep them up to date, especially
          your delivery address and phone number.
        </li>
        <li>
          You are responsible for keeping your password private and for any
          activity on your account. Tell us straight away if you think someone
          else has used it.
        </li>
        <li>
          We may suspend or close an account that is used fraudulently,
          abusively or in breach of these terms.
        </li>
      </ul>
    ),
  },
  {
    id: "products",
    title: "Products, sizing and pricing",
    content: (
      <>
        <ul>
          <li>
            We try to show our shoes accurately. Colours can look different
            depending on your screen, and since some materials, such as leather
            and suede, are natural, each pair may vary slightly.
          </li>
          <li>
            Please check the size guide on each product page before ordering.
            Sizing can differ between styles and brands. If a pair does not
            fit, see <a href="#returns">Returns and exchanges</a>.
          </li>
          <li>
            All prices are in Sri Lankan Rupees (LKR) and include any
            applicable taxes. Delivery charges, if any, are shown at checkout
            before you place your order.
          </li>
          <li>
            Every product is subject to availability. If a size sells out after
            you order, we will contact you to offer an exchange or a full
            refund.
          </li>
          <li>
            If we listed a product at a clearly wrong price, we may cancel the
            order. If you have already paid, we will refund you in full.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "orders",
    title: "Placing an order",
    content: (
      <>
        <p>
          When you place an order, you are offering to buy the items in your
          bag. We will send you an email to confirm we have received it. A
          contract between us is formed only when we confirm and dispatch your
          order.
        </p>
        <p>
          We may refuse or cancel an order if we cannot verify the payment or
          the delivery details, if we cannot reach you to confirm a
          cash-on-delivery order, if we suspect fraud, or if a pricing error has
          been made. If you have already paid for a cancelled order, we will
          refund you in full.
        </p>
        <p>
          You can cancel your order at no charge before it is dispatched. To do
          so, contact us at{" "}
          <a href={`mailto:${C.email}`}>{C.email}</a> or {C.phone}.
        </p>
      </>
    ),
  },
  {
    id: "payment",
    title: "Payment",
    content: (
      <>
        <h3>Cash on delivery (COD)</h3>
        <ul>
          <li>
            We will call or text the phone number you give us to confirm your
            order before we dispatch it.
          </li>
          <li>
            Pay the courier the full amount in cash when your order arrives.
            Please have the exact amount ready.
          </li>
          <li>
            If you refuse a COD order without a valid reason (for example,
            the item is not faulty, damaged or incorrect), or keep missing
            delivery attempts, we may not offer COD on your future orders.
          </li>
        </ul>
        <h3>Bank transfer</h3>
        <ul>
          <li>
            Transfer the order total to the bank account shown at checkout, and
            upload a clear copy of your receipt.
          </li>
          <li>
            We dispatch your order once the money has reached our account.
          </li>
          <li>
            If we do not receive a valid payment within 3 working days of your
            order, we may cancel it.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "delivery",
    title: "Delivery",
    content: (
      <ul>
        <li>
          <strong>We deliver only to addresses within Sri Lanka.</strong>
        </li>
        <li>
          Standard delivery usually takes 3 to 5 working days. Express delivery,
          where offered, arrives on the next working day for orders confirmed
          by 2.00 pm. Delivery to remote areas may take longer.
        </li>
        <li>
          Delivery times are estimates, not guarantees. Delays can be caused by
          things outside our control, such as weather, public holidays,
          strikes or courier disruptions. If your order is badly delayed, we
          will keep you updated, and you may cancel it for a full refund
          before it is dispatched.
        </li>
        <li>
          Please check your parcel when it arrives. If it looks damaged or
          tampered with, tell the courier and contact us within 48 hours.
        </li>
        <li>
          Ownership of the goods, and the risk of loss or damage, pass to you
          once the order is delivered to your address.
        </li>
        <li>
          If a delivery fails because the address was wrong or incomplete, or
          because nobody could be reached, we may charge you for redelivery.
        </li>
      </ul>
    ),
  },
  {
    id: "returns",
    title: "Returns and exchanges",
    content: (
      <>
        <p>
          If your shoes do not fit or are not right for you, you can return or
          exchange them within <strong>14 days of delivery</strong>, as long as
          they:
        </p>
        <ul>
          <li>are unworn, except for trying them on indoors on a clean surface;</li>
          <li>
            are in their original condition, with no marks, creases or wear on
            the soles;
          </li>
          <li>
            come back in the original, undamaged shoe box with all tags,
            dust bags and accessories.
          </li>
        </ul>
        <p>
          <strong>Exchanges for a different size</strong> depend on stock. If
          the size you need is not available, we will refund you instead.
        </p>
        <p>
          <strong>Items we cannot accept back,</strong> unless they are faulty:
          shoes bought on final sale or clearance, socks and insoles (for
          hygiene reasons), and personalised items.
        </p>
        <h3>How to return</h3>
        <ul>
          <li>
            Contact us at <a href={`mailto:${C.email}`}>{C.email}</a> with your
            order number. We will tell you how to send the item back, or
            arrange a collection.
          </li>
          <li>
            You pay return delivery costs for change-of-mind returns. If the
            item is faulty or we sent the wrong one, we pay them.
          </li>
          <li>
            We inspect every returned item. If a return does not meet the
            conditions above, we may send it back to you at your cost.
          </li>
        </ul>
        <h3>Refunds</h3>
        <ul>
          <li>
            Approved refunds are made by bank transfer to an account in your
            name, within 7 to 10 working days of us receiving the return.
          </li>
          <li>
            We refund the price you paid for the item. The original delivery
            charge is refunded only if the item was faulty or incorrect.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "faulty",
    title: "Faulty or incorrect items",
    content: (
      <p>
        If your shoes arrive damaged, have a manufacturing defect, or are not
        what you ordered, contact us within 14 days of delivery and include
        photos if you can. Once we confirm the problem, we will offer a repair,
        a replacement or a full refund, including delivery costs, in line with
        your rights under Sri Lankan consumer law. Normal wear and tear, damage
        from misuse or poor care, and the natural ageing of materials are not
        manufacturing defects.
      </p>
    ),
  },
  {
    id: "promotions",
    title: "Promotions and gift wrapping",
    content: (
      <ul>
        <li>
          Promo codes and discounts are subject to their stated conditions and
          expiry dates. They cannot be exchanged for cash, and only one code can
          be used per order unless we say otherwise.
        </li>
        <li>
          We may withdraw or change a promotion at any time. If we do, it will
          not affect orders that have already been confirmed.
        </li>
        <li>
          If you ask for gift wrapping, we will not include the price in the
          parcel. The same return conditions still apply.
        </li>
      </ul>
    ),
  },
  {
    id: "reviews",
    title: "Reviews and acceptable use",
    content: (
      <>
        <p>
          You are welcome to post honest reviews of products you have bought.
          By posting a review, you give us a free, non-exclusive licence to
          display it on our site and use it in our marketing. Reviews must not
          be false, offensive, defamatory, or infringe anyone&rsquo;s rights,
          and must not contain personal data about other people. We may remove
          any review that breaks these rules.
        </p>
        <p>When using the site, you must not:</p>
        <ul>
          <li>try to gain unauthorised access to our systems or other accounts;</li>
          <li>
            scrape, copy or use automated tools on the site without our written
            permission;
          </li>
          <li>place fake orders or upload false payment receipts;</li>
          <li>upload viruses or any other harmful code.</li>
        </ul>
      </>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    content: (
      <p>
        All content on this site, including the Meridian name and logo, product
        photos, text and design, belongs to Meridian or our licensors and is
        protected by the Intellectual Property Act No. 36 of 2003. You may not
        copy, reproduce or use it commercially without our written permission.
        Third-party brand names and logos belong to their owners.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Our liability",
    content: (
      <>
        <p>
          We are responsible for loss or damage you suffer that is a
          foreseeable result of us breaking these terms or failing to use
          reasonable care. We are not responsible for losses that were not
          foreseeable, for business losses, or for delays caused by events
          outside our reasonable control.
        </p>
        <p>
          As far as the law allows, our total liability for any order is
          limited to the amount you paid for it. Nothing in these terms limits
          our liability where the law does not allow it to be limited,
          including liability for fraud, or for death or personal injury caused
          by our negligence.
        </p>
      </>
    ),
  },
  {
    id: "law",
    title: "Governing law and disputes",
    content: (
      <p>
        These terms are governed by the laws of the Democratic Socialist
        Republic of Sri Lanka. If you have a problem, please contact us first
        so we can try to resolve it. If we cannot, either of us may bring the
        dispute before the courts of Sri Lanka. You may also contact the
        Consumer Affairs Authority.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <p>
        We may update these terms from time to time. Each order is governed by
        the version of the terms in force when you placed it. The &ldquo;Last
        updated&rdquo; date at the top of this page shows when the terms last
        changed.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <ul>
        <li>
          <strong>{C.legalName}</strong>, {C.address}
        </li>
        <li>
          Email: <a href={`mailto:${C.email}`}>{C.email}</a>
        </li>
        <li>
          Phone: <a href={`tel:${C.phone.replace(/\s/g, "")}`}>{C.phone}</a> (
          {C.hours})
        </li>
      </ul>
    ),
  },
];

export default function TermsAndConditions() {
  return (
    <LegalPage
      eyebrow="Policies"
      title="Terms & Conditions"
      lastUpdated={POLICY_LAST_UPDATED}
      intro={
        <p>
          Please read these terms before you shop with Meridian. They explain
          how ordering, payment, delivery within Sri Lanka, and returns and
          exchanges work.
        </p>
      }
      sections={sections}
    />
  );
}
