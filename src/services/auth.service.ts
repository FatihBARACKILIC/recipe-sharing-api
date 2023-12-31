import { error } from "elysia";
import jwt from "jsonwebtoken";

const verifyToken = (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    return payload;
  } catch (error: any) {
    throw new Error("Invalid token");
  }
};

const signToken = (data: { id: number; email: string }) => {
  const token = jwt.sign(data, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  return token;
};

export { verifyToken, signToken };
