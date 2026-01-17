export const slugifyAnchor = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const stripMarkdown = (text: string) =>
  text
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~`>#]/g, "");

export const extractSnippet = (text: string, query: string, radius = 60) => {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query);

  if (idx === -1) return text.slice(0, 120) + "...";

  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + query.length + radius);

  const snippet = text.slice(start, end).trim();

  return (start > 0 ? "…" : "") + snippet + (end < text.length ? "…" : "");
};

export const normalizeText = (v?: string) => v?.toLowerCase().trim() ?? "";
