import type { Metadata } from "next"
import { creator, faqPageUrl } from "@/lib/creator-data"
import { pageMetadata } from "@/lib/seo"
import { Bullets, Clause, PageShell } from "@/components/site/page-shell"

const DESCRIPTION = `How ${creator.name} works with brands: scope, deliverables, rights, payment and cancellation terms.`

export const metadata: Metadata = pageMetadata({
  title: "Terms of Collaboration",
  description: DESCRIPTION,
  path: "/terms",
})

const UPDATED = "1 September 2026"

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Collaboration"
      description={DESCRIPTION}
      path="/terms"
      updated={UPDATED}
    >
      <p className="text-pretty text-lg leading-relaxed">
        These terms describe the default way we work together. Every campaign is confirmed in
        writing first — a signed brief or contract always overrides anything on this page. If a
        clause here doesn&apos;t fit the project, we change it before we start, not after.
      </p>

      <Clause heading="1. Scope and agreement">
        <p>
          A collaboration begins when both parties confirm the brief in writing. The brief states
          the deliverables, the fee, the timeline, the licence and any exclusivity. Nothing is
          commissioned until that confirmation exists.
        </p>
      </Clause>

      <Clause heading="2. What I deliver">
        <p>
          Short-form vertical video, delivered as a 9:16 master. Unless the brief says otherwise,
          every package includes:
        </p>
        <Bullets
          items={[
            "Vertical-first 9:16 master, plus a captioned and a clean cut.",
            "Hook and script document, shot list, and caption drafts.",
            "One round of revisions; two on campaign packages.",
            "Tracked links with UTM parameters for anything clickable.",
            "A plain-English performance report within 7 days of publishing.",
          ]}
        />
        <p>
          Product-accuracy corrections and legally required claim changes are never counted as
          revisions.
        </p>
      </Clause>

      <Clause heading="3. Content ownership and licence">
        <p>
          I own the underlying content I produce. You receive a licence to use it as agreed in the
          brief:
        </p>
        <Bullets
          items={[
            "Organic — publishing on my channels, as part of the agreed deliverable.",
            "Paid — running the video as an advertisement, for 30 or 90 days, quoted as a line item.",
            "Whitelisting — creator-handle ads (Spark and similar), quoted separately.",
            "Organic brand posting on your own channels — confirm this is included in the brief.",
          ]}
        />
        <p>
          Any licence beyond those windows needs to be agreed in writing before production, and
          pricing reflects reach, duration and market.
        </p>
      </Clause>

      <Clause heading="4. Exclusivity">
        <p>
          Where exclusivity is agreed, the brief names the excluded category and the period. I
          won&apos;t promote a direct competitor inside that window. I also won&apos;t accept an
          exclusivity request so broad that it blocks work I already have booked — if that comes
          up, we negotiate the category definition rather than the deal.
        </p>
      </Clause>

      <Clause heading="5. Your responsibilities">
        <Bullets
          items={[
            "Send the product, shipping details and any brand guidelines before the production date.",
            "Provide a single point of contact for approvals — approvals slow campaigns down more than production does.",
            "Flag regulatory or claim requirements before filming, not after.",
          ]}
        />
      </Clause>

      <Clause heading="6. Timeline">
        <p>
          Standard turnaround is 10–14 days for a single video and 3–4 weeks for campaign packages,
          counted from the day the brief and product are both confirmed. Delays on the product or
          feedback side move the timeline accordingly. Booking {creator.bookingLead} ahead is
          recommended for anything with a fixed launch date.
        </p>
      </Clause>

      <Clause heading="7. Payment">
        <p>
          Fees are quoted per project. The default terms are 50% on signing and 50% on delivery of
          final files; commission-only affiliate campaigns have no fixed fee. Payment terms are
          stated in the brief and override this default.
        </p>
        <p>
          Late payment is handled in good faith — tell me early and we&apos;ll adjust the schedule
          rather than pause the work.
        </p>
      </Clause>

      <Clause heading="8. Performance reporting">
        <p>
          I report views, 3-second hook retention, completion rate, link clicks and, for affiliate
          work, conversions and revenue. I report what the data shows, including when a campaign
          underperforms. Figures come from platform analytics and are not audited by a third party.
        </p>
        <p>
          Content marked as a recommendation is my honest opinion. I only link products I use —
          see <a href={faqPageUrl}>the FAQ</a> for how I choose what to recommend.
        </p>
      </Clause>

      <Clause heading="9. Cancellation">
        <p>
          Either side can cancel before production starts; in that case the deposit is
          non-refundable for work already commissioned. After filming begins, payment is owed for
          work completed to that point, and any remaining balance depends on the stage reached.
        </p>
      </Clause>

      <Clause heading="10. Independent contractor">
        <p>
          I am an independent creator, not an employee. I set my own schedule and methods. You are
          responsible for withholding and reporting any taxes required in your jurisdiction, and
          for providing any insurance your policies require.
        </p>
      </Clause>

      <Clause heading="11. Liability">
        <p>
          I take care to keep factual claims accurate and will correct anything inaccurate on
          request. I cannot guarantee specific view counts, engagement rates or sales — those
          depend on factors neither of us fully controls. My total liability on any campaign is
          limited to the fee paid for that campaign.
        </p>
      </Clause>

      <Clause heading="12. Governing law">
        <p>
          These terms are governed by the laws of the Republic of Indonesia, without regard to
          conflict-of-law rules. Disputes go to the courts of Jakarta, and I&apos;d much rather fix
          the problem first.
        </p>
      </Clause>

      <Clause heading="Contact">
        <p>
          Questions before you brief me are welcome —{" "}
          <a href={`mailto:${creator.email}`}>{creator.email}</a>. I&apos;d rather answer a question
          now than renegotiate later.
        </p>
      </Clause>
    </PageShell>
  )
}
