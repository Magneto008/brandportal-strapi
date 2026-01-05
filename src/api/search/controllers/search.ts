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

const getSectionText = (section: any): string | null => {
  switch (section.__component) {
    case "section.page-header-section":
      return section.title;

    case "section.small-heading-section":
      return section.text;

    case "section.editorial-text-section":
      return section.content;

    case "section.text-section":
      return section.content;

    case "section.anchor-section":
      return section.label;

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

    const matches: { page: any; excerpt: string }[] = [];

    for (const page of pages) {
      let matched = false;
      let excerpt = "";

      if (page.title?.toLowerCase().includes(q)) {
        matched = true;
        excerpt = page.title;
      } else if (page.slug?.toLowerCase().includes(q)) {
        matched = true;
        excerpt = page.slug.replace(/-/g, " ");
      }

      if (!matched && Array.isArray(page.sections)) {
        for (const section of page.sections) {
          const text = getSectionText(section);
          if (!text) continue;

          const clean = stripMarkdown(text);
          if (!clean.toLowerCase().includes(q)) continue;

          matched = true;
          excerpt = extractSnippet(clean, q);
          break;
        }
      }

      if (matched) {
        matches.push({ page, excerpt });
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

    const results = matches.slice(0, 10).map(({ page, excerpt }) => ({
      id: `page-${page.id}`,
      type: "page",
      title: page.title,
      excerpt,
      href: buildPath(page),
    }));

    return ctx.send(results);
  },
};
