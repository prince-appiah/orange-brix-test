import { Request, Response } from "express";
import { IUser } from "../interfaces/models.interface";
import User from "../models/user.model";
import { RequestWithUser } from "../typings";
import { TokenHelper } from "../utils/TokenHelper";

class AuthController {
  static async signupUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ msg: "Name, email and password are required" });
      }

      // check if email is already registered
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        throw new Error("Email already exists");
      }

      // hash password with mongoose?
      const createdUser = await User.create({ name, email, password });

      return res.status(201).json(createdUser);
    } catch (error) {
      console.log("🚀 ~ error", error);
      return res.status(500).json(error);
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body as IUser;

      // check if email is already registered
      const user = await User.findOne({ email }).lean();
      if (!user) {
        throw new Error("User not found with the email address");
      }

      const existingUser = await User.findOne({ email });
      const matchPassword = await existingUser!.comparePassword(password);

      const token = await TokenHelper.createToken(user);
      if (matchPassword && token) {
        return res.status(200).json({ msg: "Login success", token });
      }
      return res.status(400).json({ msg: "Could not log in" });
    } catch (error) {
      console.log("🚀 ~ error", error);
      return res.status(500).json(error);
    }
  }

  static async signout(req: RequestWithUser, res: Response) {
    try {
      const decoded = req.user ? req.user : null;
      const authHeader = req.headers.authorization ? req.headers.authorization : null;

      if (authHeader && decoded) {
        delete req.user;
        delete req.headers.authorization;

        return res.status(200).json({ msg: "Logout successful" });
      }
      return res.status(400).json({ msg: "Could not log out" });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default AuthController;
