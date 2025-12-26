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

    return await super.find(ctx);
  },

  async findOne(ctx) {
    const user = ctx.state.user;

    ctx.query.populate = {
      ...(typeof ctx.query.populate === "object" ? ctx.query.populate : {}),
      parent: true,
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
