import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import Link from "next/link";
import type { ReactNode } from "react";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: ReactNode;
  sections: LegalSection[];
};

/**
 * Shared layout for Meridian's policy pages (Privacy Policy, Terms & Conditions).
 * Renders a title block, a sticky table of contents on desktop, and numbered sections.
 */
export default function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink">
      <Header />

      <main className="flex-1">
        {/* Title block */}
        <section className="border-b border-line bg-surface-cream">
          <div className="mx-auto max-w-site px-gutter-mobile py-section-mobile md:px-gutter md:py-20">
            <p className="eyebrow text-ink-subtle">{eyebrow}</p>
            <h1 className="mt-4 font-display text-4xl tracking-tightest md:text-6xl">
              {title}
            </h1>
            <p className="mt-6 text-sm text-ink-subtle">
              Last updated: {lastUpdated}
            </p>
            <div className="mt-6 max-w-2xl text-md text-ink-muted">{intro}</div>
          </div>
        </section>

        <div className="mx-auto grid max-w-site gap-12 px-gutter-mobile py-section-mobile md:px-gutter lg:grid-cols-12 lg:py-20">
          {/* Table of contents */}
          <nav aria-label="On this page" className="lg:col-span-4">
            <div className="border border-line p-6 lg:sticky lg:top-8">
              <p className="eyebrow text-ink-subtle">On this page</p>
              <ol className="mt-4 space-y-2">
                {sections.map((section, i) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex gap-3 text-sm text-ink-muted transition-colors hover:text-brand"
                    >
                      <span className="tabular-nums text-ink-subtle">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          {/* Sections */}
          <article className="space-y-14 lg:col-span-8">
            {sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-8"
              >
                <h2 className="border-b border-line pb-3 font-display text-xl md:text-2xl">
                  <span className="mb-1 block font-sans text-xs tracking-eyebrow text-ink-subtle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4 text-base text-ink-muted [&_a]:text-ink-strong [&_a]:underline [&_a]:underline-offset-4 [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-ink [&_li]:pl-1 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                  {section.content}
                </div>
              </section>
            ))}

            <div className="border-t border-line pt-8 text-sm text-ink-subtle">
              See also:{" "}
              <Link href="/Policies/privacy" className="text-ink-strong underline underline-offset-4">
                Privacy Policy
              </Link>{" "}
              ·{" "}
              <Link href="/Policies/terms" className="text-ink-strong underline underline-offset-4">
                Terms &amp; Conditions
              </Link>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
