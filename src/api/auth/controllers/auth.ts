import {
  createPasswordResetToken,
  verifyPasswordResetToken,
} from "../utils/createPasswordResetToken";
import {
  createVerificationToken,
  verifyToken,
} from "../utils/createVerificationToken";
import { generateEmailFromTemplate } from "../utils/generateEmailFromTemplate";
import jwt from "jsonwebtoken";

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
      registerToken,
    } = ctx.request.body ?? {};

    if (!email || !password) {
      return ctx.badRequest("Email and password are required");
    }

    if (!registerToken) {
      return ctx.forbidden("Email verification required before registration");
    }
    const normalizedEmail = email.toLowerCase();

    let verifiedEmail: string;

    try {
      verifiedEmail = verifyToken(registerToken);
    } catch (err) {
      return ctx.forbidden("Invalid or expired email verification token");
    }

    if (verifiedEmail !== normalizedEmail) {
      return ctx.forbidden("Email does not match verified email");
    }

    const existing = await strapi.entityService
      .findMany("plugin::users-permissions.user", {
        filters: { email: normalizedEmail },
        limit: 1,
      })
      .then((r) => r[0]);

    if (existing) {
      return ctx.badRequest("Email already exists");
    }

    const usersService = strapi.plugin("users-permissions").service("user");

    let newUser;

    try {
      newUser = await usersService.add({
        username: normalizedEmail.split("@")[0],
        email: normalizedEmail,
        password,
        provider: "local",
        confirmed: true,
        blocked: false,
        firstName,
        lastName,
        company,
        market,
        continentalContactEmail,
        approvedByAdmin: false,
      });
    } catch (err) {
      throw err;
    }

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

    await authController.callback(ctx, async () => {});

    const result = ctx.body;

    if (!result?.jwt || !result?.user) {
      return;
    }

    ctx.cookies.set("jwt", result.jwt, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    if (!result.user.approvedByAdmin) {
      ctx.cookies.set("jwt", "", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        expires: new Date(0),
        path: "/",
      });

      ctx.status = 403;
      ctx.body = {
        success: false,
        message: "Your account is pending admin approval",
      };
      return;
    }

    ctx.body = {
      success: true,
      user: {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
      },
    };
  },

  async user(ctx) {
    const token = ctx.cookies.get("jwt");
    if (!token) return ctx.send(null);

    let decoded;
    try {
      decoded = jwt.verify(
        token,
        strapi.config.get("plugin::users-permissions.jwtSecret")
      );
    } catch {
      return ctx.send(null);
    }

    const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      decoded.id
    );

    if (!user) return ctx.send(null);

    return ctx.send({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  },

  async logout(ctx) {
    ctx.cookies.set("jwt", "", {
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

  async request(ctx) {
    const { email } = ctx.request.body ?? {};

    if (!email) {
      return ctx.badRequest("Email is required");
    }

    const normalizedEmail = email.toLowerCase();

    const token = createVerificationToken(normalizedEmail);

    const frontendUrl = process.env.FRONTEND_URL;
    if (!frontendUrl) {
      return ctx.internalServerError("FRONTEND_URL not configured");
    }

    const verifyUrl = `${frontendUrl}/pre-register/verify?token=${token}`;

    const emailContent = generateEmailFromTemplate({
      title: "Verify your email",
      textBlocks: [
        "Thank you for starting your registration with the Continental Brand Portal.",
        "Please verify your email address to continue with the registration process.",
      ],
      linkHrefs: [verifyUrl],
    });

    await strapi.plugin("email").service("email").send({
      to: normalizedEmail,
      subject: "Verify your email to continue registration",
      html: emailContent.html,
      text: emailContent.text,
      attachments: emailContent.attachments,
    });

    return ctx.send({
      success: true,
      message: "Verification email sent",
    });
  },

  async verify(ctx) {
    const { token } = ctx.query ?? {};

    if (typeof token !== "string") {
      return ctx.badRequest("Token is required");
    }

    try {
      const email = verifyToken(token);

      return ctx.send({
        success: true,
        email,
        message: "Email verified successfully",
      });
    } catch (err) {
      console.log(err);
      return ctx.badRequest("Invalid or expired verification token");
    }
  },

  async forgotPassword(ctx) {
    const { email } = ctx.request.body ?? {};

    if (!email) {
      return ctx.badRequest("Email is required");
    }

    const normalizedEmail = email.toLowerCase();

    const user = await strapi.entityService
      .findMany("plugin::users-permissions.user", {
        filters: { email: normalizedEmail },
        limit: 1,
      })
      .then((r) => r[0]);

    if (!user) {
      return ctx.send({
        success: true,
        message: "If the email exists, a reset link was sent.",
      });
    }

    const passwordChangedAtDate = user.passwordChangedAt
      ? new Date(user.passwordChangedAt)
      : null;

    const token = createPasswordResetToken(
      normalizedEmail,
      passwordChangedAtDate
    );

    const frontendUrl = process.env.FRONTEND_URL;
    if (!frontendUrl) {
      return ctx.internalServerError("FRONTEND_URL not configured");
    }

    const resetUrl = `${frontendUrl}/reset-password?token=${token}`;

    const emailContent = generateEmailFromTemplate({
      title: "Reset your password",
      textBlocks: [
        "You requested a password reset for your Continental Brand Portal account.",
        "Click the link below to set a new password. This link expires in 1 hour.",
      ],
      linkHrefs: [resetUrl],
    });

    await strapi.plugin("email").service("email").send({
      to: normalizedEmail,
      subject: "Reset your password",
      html: emailContent.html,
      text: emailContent.text,
      attachments: emailContent.attachments,
    });

    return ctx.send({
      success: true,
      message: "If the email exists, a reset link was sent.",
    });
  },

  async resetPassword(ctx) {
    const { token, password } = ctx.request.body ?? {};

    if (!token || !password) {
      return ctx.badRequest("Token and new password are required");
    }

    try {
      const decoded = jwt.decode(token) as { email?: string };
      if (!decoded?.email) {
        return ctx.badRequest("Invalid or expired reset token");
      }

      const user = await strapi.entityService
        .findMany("plugin::users-permissions.user", {
          filters: { email: decoded.email },
          limit: 1,
        })
        .then((r) => r[0]);

      if (!user) {
        return ctx.badRequest("User not found");
      }

      const passwordChangedAtDate = user.passwordChangedAt
        ? new Date(user.passwordChangedAt)
        : null;

      verifyPasswordResetToken(token, passwordChangedAtDate);

      await strapi.plugin("users-permissions").service("user").edit(user.id, {
        password,
        passwordChangedAt: new Date(),
      });

      return ctx.send({
        success: true,
        message: "Password reset successfully",
      });
    } catch {
      return ctx.badRequest("Invalid or expired reset token");
    }
  },
};
