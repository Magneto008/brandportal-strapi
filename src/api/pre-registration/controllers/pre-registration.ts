import crypto from "crypto";

const UID = "api::pre-registration.pre-registration";

export default {
  async request(ctx) {
    const { email } = ctx.request.body ?? {};

    if (!email) {
      return ctx.badRequest("Email is required");
    }

    const normalizedEmail = email.toLowerCase();
    const token = crypto.randomBytes(32).toString("hex");

    const existing = await strapi.documents(UID).findMany({
      filters: {
        email: normalizedEmail,
        used: false,
      },
    });

    for (const entry of existing) {
      await strapi.documents(UID).update({
        documentId: entry.documentId,
        data: { used: true },
      });
    }

    await strapi.documents(UID).create({
      data: {
        email: normalizedEmail,
        token,
        verified: false,
        used: false,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      },
    });

    const verifyUrl = `${process.env.STRAPI_URL}/api/pre-register/verify?token=${token}`;

    await strapi.plugin("email").service("email").send({
      to: normalizedEmail,
      subject: "Verify your email to continue registration",
      text: `Click the link to verify your email:\n\n${verifyUrl}`,
    });

    return ctx.send({
      success: true,
      message: "Verification email sent",
    });
  },

  async verify(ctx) {
    const { token } = ctx.query ?? {};

    if (!token) {
      return ctx.badRequest("Token is required");
    }

    const entries = await strapi.documents(UID).findMany({
      filters: {
        token,
        used: false,
        expiresAt: { $gt: new Date() },
      },
      limit: 1,
    });

    const preReg = entries[0];

    if (!preReg) {
      return ctx.badRequest("Invalid or expired verification token");
    }

    await strapi.documents(UID).update({
      documentId: preReg.documentId,
      data: {
        verified: true,
      },
    });

    const redirectUrl = `${process.env.FRONTEND_URL}/register?token=${token}`;

    ctx.redirect(redirectUrl);
  },
};
