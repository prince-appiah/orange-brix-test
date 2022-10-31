import { NextFunction, Request, Response } from "express";
import { IDecodedToken } from "../typings";

import { TokenHelper } from "../utils/TokenHelper";

// todo extend express request interface to include user object
export const requireAuth = async (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];

    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(403).json({ msg: "Token is required" });
      }

      const decoded = (await TokenHelper.verifyToken(token)) as IDecodedToken;

      if (decoded && decoded?.exp) {
        req.user = decoded;
        return next();
      }

      return res.status(401).json({ msg: "Token expired" });
    }

    return res.status(401).json({ msg: "Unauthorized" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
