import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
}
