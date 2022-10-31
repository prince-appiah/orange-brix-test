import jwt from "jsonwebtoken";
import { IDecodedToken } from "../typings";

export class TokenHelper {
  static async verifyToken(token: string) {
    try {
      if (!token) {
        throw new Error("No token provided");
      }

      const verifiedToken = await jwt.verify(token, "some-secret", {
        maxAge: "12h", // or 3600 * 5 = 12 hours
      });

      return verifiedToken;
    } catch (error) {
      return false;
    }
  }

  static async createToken(payload: any) {
    try {
      if (!payload) {
        throw new Error("No payload provided");
      }

      const signedToken = await jwt.sign(payload, "some-secret", {
        expiresIn: "12h", // or 3600 * 5 = 12 hours
      });

      return signedToken;
    } catch (error) {
      console.log("🚀 ~ error", error);
      // Sentry.captureException(error);
      return false;
    }
  }
}
