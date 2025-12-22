import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const VERIFY_EXPIRY = "15m";

export function createVerificationToken(email: string) {
  return jwt.sign(
    {
      email,
    },
    JWT_SECRET,
    { expiresIn: VERIFY_EXPIRY }
  );
}

export function verifyToken(token: string) {
  const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
    email: string;
    purpose: string;
  };
  return payload.email;
}
