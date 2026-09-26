import type { Metadata } from "next"
import Link from "next/link"
import { creator } from "@/lib/creator-data"
import { pageMetadata } from "@/lib/seo"
import { Bullets, Clause, PageShell } from "@/components/site/page-shell"

const DESCRIPTION = `How ${creator.name} collects, uses and protects your personal data.`

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: DESCRIPTION,
  path: "/privacy",
})

const UPDATED = "1 September 2026"

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description={DESCRIPTION}
      path="/privacy"
      updated={UPDATED}
    >
      <p className="text-pretty text-lg leading-relaxed">
        This policy explains what happens to the information you send me through this website. It
        is written to be read, not to be skipped — if anything is unclear, email{" "}
        <a href={`mailto:${creator.email}`}>{creator.email}</a> and I&apos;ll explain it properly.
      </p>

      <Clause heading="What I collect">
        <p>
          When you use the contact form I collect the name, email address, company and project
          type you enter, plus the message you write. That is the only personal data this site
          collects.
        </p>
        <Bullets
          items={[
            "No advertising or analytics trackers that build a profile of you.",
            "No cookies set by this site beyond your light/dark theme preference, which stays in your browser's local storage.",
            "Aggregate, privacy-preserving traffic analytics may be recorded to understand which pages are useful.",
          ]}
        />
      </Clause>

      <Clause heading="Why I collect it">
        <p>
          To reply to your enquiry and, if we work together, to deliver the campaign and report on
          its results. That is legitimate interest under GDPR and equivalent frameworks — I need
          your details to answer you.
        </p>
        <p>
          Where a campaign involves affiliate links, I also record which link you clicked, so
          conversions can be attributed to the right partner and you are not credited for someone
          else&apos;s sale.
        </p>
      </Clause>

      <Clause heading="How long I keep it">
        <p>
          Enquiries that do not become projects are deleted within 12 months. Project records are
          kept for 24 months after delivery, which covers the tax and reporting window. Affiliate
          click data is kept in aggregate.
        </p>
      </Clause>

      <Clause heading="Who I share it with">
        <p>
          Nobody, except the service providers that make the site work — my email provider and
          hosting provider. Both process data on my instructions and neither is permitted to use
          it for its own purposes.
        </p>
        <p>
          If a campaign partner needs contact details (for example, an agency handling payment), I
          share only what is necessary to deliver the work and I will tell you when I do.
        </p>
      </Clause>

      <Clause heading="Affiliate links">
        <p>
          Some links on this site are affiliate links. When you click one, the merchant may place a
          cookie to credit the referral. I may earn a commission at no extra cost to you. This
          never changes which products I recommend — see my{" "}
          <Link href="/#picks">product recommendations</Link> for how I choose.
        </p>
      </Clause>

      <Clause heading="Your rights">
        <p>
          You can ask me at any time to show you the data I hold about you, correct it, delete it,
          or restrict how I use it. You can also complain to your local data protection
          authority.
        </p>
        <p>
          Email <a href={`mailto:${creator.email}`}>{creator.email}</a> and I will respond within
          30 days.
        </p>
      </Clause>

      <Clause heading="Security and contact">
        <p>
          Data is transmitted over HTTPS. No system is perfectly secure, but I keep the amount of
          data I hold deliberately small, which is the most effective protection available.
        </p>
        <p>
          Questions about this policy: <a href={`mailto:${creator.email}`}>{creator.email}</a>.
        </p>
      </Clause>
    </PageShell>
  )
}
