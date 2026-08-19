import { clsx } from "@/lib/clsx";
import { Container } from "@/components/ui/Container";

type SectionProps = {
  children: React.ReactNode;
  /** Anchor target for nav links (e.g. "projects", "content"). */
  id?: string;
  className?: string;
  size?: "default" | "lg";
  width?: "content" | "prose";
};

export function Section({
  children,
  id,
  className,
  size = "default",
  width = "content",
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        size === "lg" ? "py-section-lg" : "py-section",
        className,
      )}
    >
      <Container width={width}>{children}</Container>
    </section>
  );
}
