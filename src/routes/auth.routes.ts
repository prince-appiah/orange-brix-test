import { Application, Router } from "express";
import AuthController from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const authRoutes = (app: Application) => {
  const baseUrl = "/auth";
  let router = Router();

  router.post(`${baseUrl}/signup`, AuthController.signupUser);
  router.post(`${baseUrl}/login`, AuthController.loginUser);
  router.get(`${baseUrl}/logout`, requireAuth, AuthController.signout);

  return router;
};

export default authRoutes;
