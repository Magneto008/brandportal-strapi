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

    const registerToken =
      ctx.request.headers["x-register-token"] ??
      ctx.request.body?.registerToken;

    if (!email || !password) {
      return ctx.badRequest("Email and password are required");
    }

    if (!registerToken) {
      return ctx.forbidden("Email verification required before registration");
    }

    const normalizedEmail = email.toLowerCase();

    // 🔒 VERIFY PRE-REGISTRATION TOKEN (Strapi v5 way)
    const preRegs = await strapi
      .documents("api::pre-registration.pre-registration")
      .findMany({
        filters: {
          token: registerToken,
          email: normalizedEmail,
          verified: true,
          used: false,
          expiresAt: { $gt: new Date() },
        },
        limit: 1,
      });

    const preReg = preRegs[0];

    if (!preReg) {
      return ctx.forbidden("Invalid or expired email verification token");
    }

    // 🔍 EXISTING USER CHECK
    const existing = await strapi.entityService
      .findMany("plugin::users-permissions.user", {
        filters: { email: normalizedEmail },
        limit: 1,
      })
      .then((r) => r[0]);

    if (existing) {
      return ctx.badRequest("Email already exists");
    }

    // ✅ CREATE USER (users-permissions service is correct)
    const usersService = strapi.plugin("users-permissions").service("user");

    const newUser = await usersService.add({
      username: normalizedEmail.split("@")[0],
      email: normalizedEmail,
      password,
      provider: "local",
      confirmed: false, // admin approval still required
      blocked: false,
      firstName,
      lastName,
      company,
      market,
      continentalContactEmail,
      approvedByAdmin: false,
    });

    // 🔐 MARK TOKEN AS USED (Strapi v5 way)
    await strapi.documents("api::pre-registration.pre-registration").update({
      documentId: preReg.documentId,
      data: { used: true },
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

    if (!loginEmail || !password) {
      return ctx.badRequest("Email and password are required");
    }

    ctx.request.body = {
      identifier: String(loginEmail).toLowerCase(),
      password,
    };

    const authController = strapi
      .plugin("users-permissions")
      .controller("auth");

    // Let Strapi authenticate
    await authController.callback(ctx, async () => {});

    const result = ctx.body;

    // 🚨 Authentication failed
    if (!result?.jwt || !result?.user) {
      return ctx.send(result);
    }

    // 🚨 ADMIN APPROVAL CHECK
    if (!result.user.approvedByAdmin) {
      ctx.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(0),
        path: "/",
      });

      ctx.status = 403;
      return ctx.send({
        success: false,
        message: "Your account is pending admin approval",
      });
    }

    // ✅ Approved → set cookie
    ctx.cookies.set("token", result.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return ctx.send(result);
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

    return ctx.send({
      success: true,
      message: "Logged out successfully",
    });
  },
};
