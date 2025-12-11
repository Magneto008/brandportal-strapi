export default {
  async register(ctx) {
    const {
      firstName,
      lastName,
      email,
      password,
      company,
      market,
      continentalContactEmail,
    } = ctx.request.body ?? {};

    if (!email || !password)
      return ctx.badRequest("Email and password are required");

    const normalizedEmail = email.toLowerCase();

    const existing = await strapi.entityService
      .findMany("plugin::users-permissions.user", {
        filters: { email: normalizedEmail },
        limit: 1,
      })
      .then((r) => r[0]);

    if (existing) return ctx.badRequest("Email already exists");

    const usersService = strapi.plugin("users-permissions").service("user");

    const newUser = await usersService.add({
      username: normalizedEmail.split("@")[0],
      email: normalizedEmail,
      password,
      provider: "local",
      confirmed: false,
      blocked: false,
      firstName,
      lastName,
      company,
      market,
      continentalContactEmail,
      approvedByAdmin: false,
    });

    if (newUser?.password) delete newUser.password;

    return ctx.send({
      success: true,
      message:
        "Account created successfully. Awaiting admin approval before login.",
      user: newUser,
    });
  },

  async login(ctx) {
    const { email, password, identifier } = ctx.request.body ?? {};
    const loginEmail = email ?? identifier;

    if (!loginEmail || !password)
      return ctx.badRequest("Email and password are required");

    ctx.request.body = {
      identifier: String(loginEmail).toLowerCase(),
      password,
    };

    const authController = strapi
      .plugin("users-permissions")
      .controller("auth");
    await authController.callback(ctx, async () => {});

    const result = ctx.body;
    const jwt = result?.jwt;

    if (jwt) {
      ctx.cookies.set("token", jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });
    }

    if (!ctx.headerSent) return ctx.send(result);
  },

  async user(ctx) {
    return ctx.send(ctx.state.user ?? null);
  },

  async logout(ctx) {
    ctx.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    return ctx.send({ success: true, message: "Logged out successfully" });
  },
};
