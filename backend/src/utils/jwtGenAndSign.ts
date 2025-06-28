import { configDotenv } from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken"

configDotenv();

interface JwtInterface extends JwtPayload{
    userId:string,
}

export const jwtSign = (userId: string): string => {
  try {
    return jwt.sign({ userId }, process.env.JWT_SECERT!, {
      expiresIn: "1h",
    });
  } catch (err) {
    console.error("JWT Sign Error:", err);
    throw new Error("Failed to sign JWT token");
  }
};


export const jwtVerify = (token: string | null): string | null => {
  if (!token || !process.env.JWT_SECERT) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECERT!) as JwtPayload;

    if (typeof decoded === "object" && "userId" in decoded) {
      return (decoded as JwtInterface).userId;
    }

    return null;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};