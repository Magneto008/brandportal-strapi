const slugifyAnchor = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const extractSnippet = (text: string, query: string, radius = 60) => {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query);

  if (idx === -1) return text.slice(0, 120) + "...";

  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + query.length + radius);

  const snippet = text.slice(start, end).trim();

  return (start > 0 ? "…" : "") + snippet + (end < text.length ? "…" : "");
};

const stripMarkdown = (text: string) =>
  text
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~`>#-]/g, "");

type SearchableSection =
  | { __component: "section.page-header-section"; title: string }
  | { __component: "section.small-heading-section"; text: string }
  | { __component: "section.editorial-text-section"; content: string }
  | { __component: "section.text-section"; title?: string; content: string }
  | { __component: "section.anchor-section"; label: string }
  | {
      __component: "section.list-section";
      title?: string;
      items: { listItem: string }[];
    }
  | {
      __component: "section.column-with-list";
      columns: {
        title: string;
        groups: { title: string; items: { text: string }[] }[];
      }[];
    }
  | {
      __component: "section.column-table";
      leftColumnLabel: string;
      rightColumnLabel: string;
      rows: { label: string; content: string }[];
    }
  | {
      __component: "section.card-items-section";
      cards: { title?: string; infoTitle?: string; infoItems?: string[] }[];
    }
  | {
      __component: "section.stacked-card-section";
      cards: {
        title?: string;
        content?: string;
        secondaryTitle?: string;
        secondaryContent?: string;
      }[];
    }
  | {
      __component: "section.downloads-section";
      title?: string;
      downloads: { title: string }[];
    }
  | {
      __component: "section.icon-link-section";
      title?: string;
      links: { label: string }[];
    }
  | { __component: "section.image-info"; title?: string; content: string }
  | { __component: "section.accordion-start"; title: string }
  | { __component: string; [key: string]: any };

const getSectionText = (
  section: SearchableSection
): string | string[] | null => {
  switch (section.__component) {
    case "section.page-header-section":
      return section.title;

    case "section.small-heading-section":
      return section.text;

    case "section.editorial-text-section":
      return section.content;

    case "section.text-section":
      return [section.title, section.content].filter(Boolean);

    case "section.anchor-section":
      return section.label;

    case "section.list-section":
      return [
        section.title,
        ...(section.items?.map((i) => i.listItem) ?? []),
      ].filter(Boolean);

    case "section.column-with-list":
      return section.columns?.flatMap((col) => [
        col.title,
        ...(col.groups ?? []).flatMap((group) => [
          group.title,
          ...(group.items ?? []).map((item) => item.text),
        ]),
      ]);

    case "section.column-table":
      return [
        section.leftColumnLabel,
        section.rightColumnLabel,
        ...(section.rows ?? []).flatMap((row) => [row.label, row.content]),
      ];

    case "section.card-items-section":
      return section.cards?.flatMap((card) => [
        card.title,
        card.infoTitle,
        ...(card.infoItems ?? []),
      ]);

    case "section.stacked-card-section":
      return section.cards?.flatMap((card) => [
        card.title,
        card.content,
        card.secondaryTitle,
        card.secondaryContent,
      ]);

    case "section.downloads-section":
      return [
        section.title,
        ...(section.downloads ?? []).map((d) => d.title),
      ].filter(Boolean);

    case "section.icon-link-section":
      return [
        section.title,
        ...(section.links ?? []).map((l) => l.label),
      ].filter(Boolean);

    case "section.image-info":
      return [section.title, section.content].filter(Boolean);

    case "section.accordion-start":
      return section.title;

    default:
      return null;
  }
};

export default {
  async index(ctx) {
    const q = ctx.query.q?.toString().trim().toLowerCase();
    if (!q || q.length < 3) return ctx.send([]);

    const pages = await strapi.documents("api::page.page").findMany({
      populate: "*",
      limit: 50,
    });

    const matches: {
      page: any;
      excerpt: string;
      anchor?: string | null;
    }[] = [];

    for (const page of pages) {
      let matched = false;
      let excerpt = "";
      let anchor: string | null = null;

      if (page.title?.toLowerCase().includes(q)) {
        matched = true;
        excerpt = page.title;
      } else if (page.slug?.toLowerCase().includes(q)) {
        matched = true;
        excerpt = page.slug.replace(/-/g, " ");
      }

      if (!matched && Array.isArray(page.sections)) {
        for (const section of page.sections as SearchableSection[]) {
          const raw = getSectionText(section);
          const text = Array.isArray(raw) ? raw.join(" ") : raw;
          if (!text) continue;

          const clean = stripMarkdown(text);
          if (!clean.toLowerCase().includes(q)) continue;

          matched = true;
          excerpt = extractSnippet(clean, q);

          if (section.__component === "section.anchor-section") {
            anchor = slugifyAnchor(section.label);
          } else if (section.__component === "section.small-heading-section") {
            anchor = slugifyAnchor(section.text);
          }

          break;
        }
      }

      if (matched) {
        matches.push({ page, excerpt, anchor });
      }
    }

    const buildPath = (page: any) => {
      const segments: string[] = [];

      if (page.root) segments.push(page.root);

      const parents: string[] = [];
      let current = page.parent;

      while (current) {
        if (current.slug) parents.unshift(current.slug);
        current = typeof current.parent === "object" ? current.parent : null;
      }

      segments.push(...parents);

      if (page.slug) segments.push(page.slug);

      return "/" + segments.join("/");
    };

    const results = matches.slice(0, 10).map(({ page, excerpt, anchor }) => ({
      id: `page-${page.id}`,
      type: "page",
      title: page.title,
      excerpt,
      href: buildPath(page) + (anchor ? `#${anchor}` : ""),
    }));

    return ctx.send(results);
  },
};
