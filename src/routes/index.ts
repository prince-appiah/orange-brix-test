import { Application, Router } from "express";
import authRoutes from "./auth.routes";
import playersRoutes from "./players.routes";

const appRoutes = (app: Application) => {
  let router = Router();

  let authenticationRoutes = authRoutes(app);
  router.use(authenticationRoutes);

  let playerRoutes = playersRoutes(app);
  router.use(playerRoutes);

  return router;
};

export default appRoutes;
