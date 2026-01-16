import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::page.page", () => ({
  async find(ctx) {
    const user = ctx.state.user;

    const rawFilters = ctx.query.filters;
    const filters =
      rawFilters && typeof rawFilters === "object" ? rawFilters : {};

    if (!user) {
      ctx.query.filters = {
        ...filters,
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
    }

    ctx.query.populate = {
      ...(typeof ctx.query.populate === "object" ? ctx.query.populate : {}),
      sections: populateSections,
    };

    return await super.find(ctx);
  },

  async findOne(ctx) {
    const user = ctx.state.user;
    
    ctx.query.populate = {
      ...(typeof ctx.query.populate === "object" ? ctx.query.populate : {}),
      parent: true,
      sections: populateSections,
    };

    const result = await super.findOne(ctx);
    const page = result?.data;

    if (!page) return result;

    if (page.requiresAuth && !user) {
      return ctx.forbidden("Authentication required");
    }

    if (page.parent?.requiresAuth && !user) {
      return ctx.forbidden("Authentication required");
    }

    return result;
  },
}));

const populateSections = {
  on: {
    "section.page-header-section": {
      populate: "*",
    },
    "section.small-heading-section": {
      populate: "*",
    },
    "section.editorial-text-section": {
      populate: "*",
    },
    "section.text-section": {
      populate: "*",
    },
    "section.divider-section": {
      populate: "*",
    },
    "section.anchor-section": {
      populate: "*",
    },
    "section.accordion-start": {
      populate: "*",
    },
    "section.accordion-end": {
      populate: "*",
    },
    "section.list-section": {
      populate: "*",
    },
    "section.column-table": {
      populate: "*",
    },
    "section.markdown-section": {
      fields: ["title", "content", "maxWidth", "centered"],
    },
    "section.row-list-section": {
      populate: {
        items: true,
      },
    },
    "section.stacked-card-section": {
      populate: {
        cards: {
          populate: {
            image: true,
            ctaButton: true,
          },
        },
      },
    },
    "section.column-with-list": {
      populate: {
        columns: {
          populate: {
            groups: {
              populate: {
                items: true,
              },
            },
          },
        },
      },
    },
    "section.icon-link-section": {
      populate: {
        links: true,
      },
    },
    "section.downloads-section": {
      populate: {
        downloads: {
          populate: ["file"],
        },
      },
    },
    "section.image-section": {
      populate: ["image"],
    },
    "section.image-slider": {
      populate: {
        images: true,
      },
    },
    "section.image-info": {
      populate: {
        image: true,
        items: {
          populate: {
            list: true,
          },
        },
      },
    },
    "section.video-section": {
      populate: ["video"],
    },
    "section.card-items-section": {
      populate: {
        cards: {
          populate: ["image"],
        },
      },
    },
  },
};
