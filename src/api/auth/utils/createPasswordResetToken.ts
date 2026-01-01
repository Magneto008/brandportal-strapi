import jwt from "jsonwebtoken";

const RESET_SECRET = process.env.JWT_SECRET;

if (!RESET_SECRET) {
  throw new Error("PASSWORD_RESET_SECRET is not defined");
}
const EXPIRES_IN = "1h";
export function createPasswordResetToken(
  email: string,
  passwordChangedAt?: Date | null
): string {
  return jwt.sign(
    {
      email,
      purpose: "password-reset",
      passwordChangedAt: passwordChangedAt ? passwordChangedAt.getTime() : null,
    },
    RESET_SECRET,
    { expiresIn: EXPIRES_IN }
  );
}

export function verifyPasswordResetToken(
  token: string,
  userPasswordChangedAt?: Date | null
): void {
  const decoded = jwt.verify(token, RESET_SECRET) as {
    purpose: string;
    iat: number;
  };

  if (decoded.purpose !== "password-reset") {
    throw new Error("Invalid token purpose");
  }

  if (
    userPasswordChangedAt &&
    decoded.iat * 1000 < userPasswordChangedAt.getTime()
  ) {
    throw new Error("Token issued before password change");
  }
}
