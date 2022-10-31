import "express";
import { Request } from "express";
import { IUser } from "./interfaces/models.interface";

declare module "express" {
  interface Request {
    user?: IUser;
  }
}

export interface RequestWithUser extends Request {
  user?: IUser;
}

export interface IDecodedToken extends IUser {
  iat: number;
  exp: number;
}
