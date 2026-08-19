import { ButtonLink } from "@/components/ui/Button";
import { contactEmail } from "@/lib/site";

export function ContactCta() {
  return (
    <div className="rounded-card border border-border bg-surface/40 p-8 md:p-12">
      <h2 className="max-w-2xl text-balance text-h2 text-fg">
        Have a product that needs AI built into it properly?
      </h2>
      <p className="mt-4 max-w-reading leading-relaxed text-fg-muted">
        I take on freelance and collaborative work — the kind where the model is
        one part of a system that has to hold up in production.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={`mailto:${contactEmail}`} external>
          Email me
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          All contact details
        </ButtonLink>
      </div>
    </div>
  );
}
