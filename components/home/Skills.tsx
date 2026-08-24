"use client";

import { Table } from "@/components/ui/heroui-table";
import { Tag } from "@/components/ui/Tag";
import type { SkillGroup } from "@/lib/content";
import { clsx } from "@/lib/clsx";

/**
 * Undoing three things the `secondary` variant does to column headers, all of
 * which read as foreign here: a `surface-secondary` fill plus a 32px corner
 * radius (together they float a filled capsule above the rows — the only such
 * shape in the section), and an `::after` tick between the two columns. What
 * is left is a mono label over a hairline, which is what the rest of the page
 * already uses. These land as utilities, so they win over HeroUI's rules in
 * the `components` layer without any `!important`.
 */
const HEAD =
  "rounded-none border-b border-border bg-transparent pb-3 font-mono text-xs uppercase tracking-widest text-fg-subtle after:content-none";

/**
 * The capability list as a real table.
 *
 * It was already a table in everything but markup — a label column beside a
 * run of chips, built out of `<dl>` and a CSS grid. Handing that to HeroUI's
 * Table (React Aria underneath) buys the semantics the grid was faking: a
 * `role="rowheader"` cell naming each area, real `columnheader`s, and
 * arrow-key navigation between rows.
 *
 * `variant="secondary"` is the unboxed one — no panel around the root, no
 * fill on the rows, just a hairline between them. That keeps the earlier
 * decision this section was built on: the case-study cards above are the
 * heavy elements on the page, so this block stays quiet and lets the ambient
 * gradient show through. `primary` would wrap the whole thing in a grey card
 * and put it in competition with them.
 *
 * Colours come from our tokens, not HeroUI's — see the HEROUI BRIDGE block in
 * app/globals.css for why that needed arranging.
 *
 * `"use client"` sits here and not just on the leaf: `Table.Cell` and friends
 * are properties hung off the `Table` function, and a client component
 * imported *into* a server component arrives as a reference proxy that carries
 * no such properties — every `Table.X` reads back undefined and the prerender
 * dies on "Element type is invalid". Declaring this file a client component
 * puts both sides in the same graph, so the compound API resolves normally.
 * The content is still read on the server in page.tsx and passed down as
 * props, so nothing here fetches at runtime and the page prerenders to HTML.
 *
 * The min-width is `sm:` and up on purpose. A table wide enough for the AI/ML
 * row does not fit a phone, and `Table.ScrollContainer` answers that with a
 * sideways scroll — fine for a data grid, wrong for this: it hides most of the
 * list off-screen behind a gesture nobody makes on a portfolio. Below `sm` the
 * table takes the viewport width instead and the chips wrap, which is what the
 * grid this replaced already did.
 */
export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <Table variant="secondary">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Capabilities by area"
          className="sm:min-w-[34rem]"
        >
          <Table.Header>
            <Table.Column
              isRowHeader
              className={clsx(HEAD, "w-24 ps-0 sm:w-[11rem]")}
            >
              Area
            </Table.Column>
            <Table.Column className={HEAD}>Stack</Table.Column>
          </Table.Header>

          <Table.Body>
            {groups.map((group) => (
              <Table.Row key={group.group}>
                <Table.Cell className="ps-0 pe-4 py-5 align-top font-mono text-xs uppercase tracking-widest text-fg-muted sm:pe-6">
                  {group.group}
                </Table.Cell>
                <Table.Cell className="py-5">
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
