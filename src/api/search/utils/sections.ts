import { slugifyAnchor } from "./text";
import type { SearchableSection } from "../types/sections";

const isAnchorSection = (
  section: SearchableSection,
): section is Extract<
  SearchableSection,
  { __component: "section.anchor-section" }
> => section.__component === "section.anchor-section";

const isSmallHeadingSection = (
  section: SearchableSection,
): section is Extract<
  SearchableSection,
  { __component: "section.small-heading-section" }
> => section.__component === "section.small-heading-section";

export const isSearchableSection = (
  section: any,
): section is SearchableSection =>
  typeof section === "object" &&
  typeof section.__component === "string" &&
  section.__component.startsWith("section.");

export const resolveAnchor = (section: SearchableSection): string | null => {
  if (isAnchorSection(section)) {
    return slugifyAnchor(section.label);
  }

  if (isSmallHeadingSection(section)) {
    return slugifyAnchor(section.text);
  }

  return null;
};

export const getSectionText = (section: SearchableSection): string | null => {
  switch (section.__component) {
    case "section.page-header-section":
      return section.title;

    case "section.small-heading-section":
      return section.text;

    case "section.editorial-text-section":
      return section.content;

    case "section.text-section":
    case "section.markdown-section":
      return [section.title, section.content].filter(Boolean).join(" ");

    case "section.anchor-section":
      return section.label;

    case "section.list-section":
      return [section.title, ...(section.items ?? []).map((i) => i.listItem)]
        .filter(Boolean)
        .join(" ");

    case "section.row-list-section":
      return (section.items ?? [])
        .flatMap((i) => [i.title, i.content])
        .filter(Boolean)
        .join(" ");

    case "section.column-with-list":
      return (section.columns ?? [])
        .flatMap((col) => [
          col.title,
          ...(col.groups ?? []).flatMap((g) => [
            g.title,
            ...(g.items ?? []).map((i) => i.text),
          ]),
        ])
        .filter(Boolean)
        .join(" ");

    case "section.column-table":
      return [
        section.leftColumnLabel,
        section.rightColumnLabel,
        ...(section.rows ?? []).flatMap((r) => [r.label, r.content]),
      ]
        .filter(Boolean)
        .join(" ");

    case "section.card-items-section":
      return (section.cards ?? [])
        .flatMap((c) => [c.title, c.infoTitle, ...(c.infoItems ?? [])])
        .filter(Boolean)
        .join(" ");

    case "section.stacked-card-section":
      return (section.cards ?? [])
        .flatMap((c) => [
          c.title,
          c.content,
          c.secondaryTitle,
          c.secondaryContent,
        ])
        .filter(Boolean)
        .join(" ");

    case "section.downloads-section":
      return [section.title, ...(section.downloads ?? []).map((d) => d.title)]
        .filter(Boolean)
        .join(" ");

    case "section.icon-link-section":
      return [section.title, ...(section.links ?? []).map((l) => l.label)]
        .filter(Boolean)
        .join(" ");

    case "section.image-info":
      return [section.title, section.content].filter(Boolean).join(" ");

    case "section.accordion-start":
      return section.title;

    default:
      return null;
  }
};
