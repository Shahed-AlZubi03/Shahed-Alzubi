/** Tiny class joiner — avoids pulling in a dependency for string concat. */
export function clsx(
  ...values: (string | false | null | undefined)[]
): string {
  return values.filter(Boolean).join(" ");
}
