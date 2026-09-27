import type { Metadata } from "next"
import { creator } from "@/lib/creator-data"
import { contentUpdated, formatRevisionDate, pageMetadata } from "@/lib/seo"
import { Bullets, Clause, PageShell } from "@/components/site/page-shell"

const DESCRIPTION = `How ${creator.name} works with clients: scope, deliverables, rights, payment and cancellation terms.`

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: DESCRIPTION,
  path: "/terms",
})

const UPDATED = formatRevisionDate(contentUpdated.terms)

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description={DESCRIPTION}
      path="/terms"
      updated={UPDATED}
    >
      <p className="text-pretty text-lg leading-relaxed">
        These terms describe the default way we work together. Every project is confirmed in
        writing first — a signed brief or contract always overrides anything on this page. If a
        clause here doesn&apos;t fit the project, we change it before we start, not after.
      </p>

      <Clause heading="1. Scope and agreement">
        <p>
          A project begins when both parties confirm the brief in writing. The brief states
          the deliverables, the fee, the timeline, and any specific requirements. Nothing is
          commissioned until that confirmation exists.
        </p>
      </Clause>

      <Clause heading="2. What I deliver">
        <p>
          Software development services, delivered as source code and deployed applications. Unless the brief says otherwise,
          every package includes:
        </p>
        <Bullets
          items={[
            "Source code with documentation and comments.",
            "Deployment instructions and configuration files.",
            "API documentation where applicable.",
            "One round of revisions; two on larger projects.",
            "Basic technical support for the agreed period.",
          ]}
        />
        <p>
          Bug fixes and security updates are never counted as revisions during the support period.
        </p>
      </Clause>

      <Clause heading="3. Code ownership and licence">
        <p>
          You own the source code and deliverables upon project completion and final payment. You receive full rights to use, modify, and distribute the code as agreed in the brief:
        </p>
        <Bullets
          items={[
            "Full source code ownership upon payment completion.",
            "Documentation and deployment guides.",
            "Custom licenses for commercial use as specified in the brief.",
            "Ongoing support options available as separate agreements.",
          ]}
        />
        <p>
          Any additional licensing needs beyond standard project delivery should be agreed in writing before development begins.
        </p>
      </Clause>

      <Clause heading="4. Exclusivity">
        <p>
          Where exclusivity is agreed, the brief names the excluded technology stack or market segment. I
          won&apos;t work with direct competitors in that space during the agreed period. I also won&apos;t accept an
          exclusivity request so broad that it blocks work I already have booked — if that comes
          up, we negotiate the scope rather than the deal.
        </p>
      </Clause>

      <Clause heading="5. Your responsibilities">
        <Bullets
          items={[
            "Provide clear project requirements and access to necessary systems.",
            "Provide a single point of contact for approvals — approvals slow development more than coding does.",
            "Flag regulatory or compliance requirements before development, not after.",
            "Ensure timely feedback on deliverables to maintain project momentum.",
          ]}
        />
      </Clause>

      <Clause heading="6. Timeline">
        <p>
          Standard turnaround is 2–3 weeks for simple websites and 4–8 weeks for full-stack applications,
          counted from the day the brief and requirements are both confirmed. Delays on requirements or
          feedback side move the timeline accordingly. Booking {creator.bookingLead} ahead is
          recommended for anything with a fixed launch date.
        </p>
      </Clause>

      <Clause heading="7. Payment">
        <p>
          Fees are quoted per project. The default terms are 50% on signing and 50% on delivery of
          final deliverables; ongoing retainer work has different payment schedules. Payment terms are
          stated in the brief and override this default.
        </p>
        <p>
          Late payment is handled in good faith — tell me early and we&apos;ll adjust the schedule
          rather than pause the work.
        </p>
      </Clause>

      <Clause heading="8. Performance and quality">
        <p>
          I deliver code that follows best practices, includes appropriate testing, and meets the requirements specified in the brief. I report on project progress and any technical challenges that arise. Code quality is based on industry standards and project requirements.
        </p>
        <p>
          Project examples shown are representative of my work. Each project is unique and results may vary based on specific requirements and constraints.
        </p>
      </Clause>

      <Clause heading="9. Cancellation">
        <p>
          Either side can cancel before development starts; in that case the deposit is
          non-refundable for work already commissioned. After development begins, payment is owed for
          work completed to that point, and any remaining balance depends on the stage reached.
        </p>
      </Clause>

      <Clause heading="10. Independent contractor">
        <p>
          I am an independent contractor, not an employee. I set my own schedule and methods. You are
          responsible for withholding and reporting any taxes required in your jurisdiction, and
          for providing any insurance your policies require.
        </p>
      </Clause>

      <Clause heading="11. Liability">
        <p>
          I take care to deliver high-quality code and will address any issues that arise. I cannot guarantee specific performance metrics or outcomes — those
          depend on factors including third-party services, hosting environments, and external dependencies. My total liability on any project is
          limited to the fee paid for that project.
        </p>
      </Clause>

      <Clause heading="12. Governing law">
        <p>
          These terms are governed by the laws of the Republic of Indonesia, without regard to
          conflict-of-law rules. Disputes go to the courts of Samarinda, and I&apos;d much rather fix
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
