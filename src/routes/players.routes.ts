import { Application, Router } from "express";
import AuthController from "../controllers/auth.controller";
import PlayersController from "../controllers/players.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const playersRoutes = (app: Application) => {
  const baseUrl = "/players";
  let router = Router();

  router.get(baseUrl, PlayersController.getAllPlayers);
  router.post(baseUrl, requireAuth, PlayersController.createPlayer);
  router.patch(`${baseUrl}/:id`, requireAuth, PlayersController.updatePlayer);
  router.delete(`${baseUrl}/:id`, requireAuth, PlayersController.removePlayer);

  return router;
};

export default playersRoutes;
