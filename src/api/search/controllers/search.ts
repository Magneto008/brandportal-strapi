import { populateSections } from "../../page/utils/populate";
import { buildPagePath } from "../utils/path";
import {
  getSectionText,
  resolveAnchor,
  isSearchableSection,
} from "../utils/sections";
import { extractSnippet, normalizeText, stripMarkdown } from "../utils/text";

const publicFilters = {
  $and: [
    {
      $or: [{ requiresAuth: false }, { requiresAuth: { $null: true } }],
    },
    {
      $or: [
        { parent: { requiresAuth: false } },
        { parent: { requiresAuth: { $null: true } } },
        { parent: { id: { $null: true } } },
      ],
    },
  ],
};

export default {
  async index(ctx) {
    const isAuthenticated = ctx.state.user?.role?.type === "authenticated";
    const q = normalizeText(ctx.query.q?.toString());
    if (!q || q.length < 3) return ctx.send([]);

    const pages = await strapi.documents("api::page.page").findMany({
      ...(isAuthenticated ? {} : { filters: publicFilters }),
      populate: {
        parent: { populate: ["parent"] },
        sections: populateSections,
      },
      limit: 50,
    });

    const results = [];

    for (const page of pages) {
      if (
        normalizeText(page.title).includes(q) ||
        normalizeText(page.slug).includes(q)
      ) {
        results.push({
          id: `page-${page.id}`,
          type: "page",
          title: page.title,
          excerpt: page.title,
          href: buildPagePath(page),
        });
      } else {
        for (const section of page.sections ?? []) {
          if (!isSearchableSection(section)) continue;

          const raw = getSectionText(section);
          if (!raw) continue;

          const clean = stripMarkdown(raw);
          if (!normalizeText(clean).includes(q)) continue;

          const anchor = resolveAnchor(section);

          results.push({
            id: `page-${page.id}`,
            type: "page",
            title: page.title,
            excerpt: extractSnippet(clean, q),
            href: buildPagePath(page) + (anchor ? `#${anchor}` : ""),
          });
          break;
        }
      }

      if (results.length >= 10) break;
    }

    return ctx.send(results);
  },
};
