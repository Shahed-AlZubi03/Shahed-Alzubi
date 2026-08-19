import { clsx } from "@/lib/clsx";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** Narrow measure for long-form copy (case studies, about). */
  width?: "content" | "prose";
};

export function Container({
  children,
  className,
  width = "content",
}: ContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto w-full px-6 md:px-8",
        width === "content" ? "max-w-content" : "max-w-reading",
        className,
      )}
    >
      {children}
    </div>
  );
}
