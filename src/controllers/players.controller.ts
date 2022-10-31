import { Request, Response } from "express";
import { IPlayer } from "../interfaces/models.interface";
import Player from "../models/player.model";

class PlayersController {
  static async getAllPlayers(req: Request, res: Response) {
    try {
      const players = await Player.find({});

      return res.status(200).json(players);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async createPlayer(req: Request, res: Response) {
    try {
      const { firstname, lastname, kitNumber } = req.body as IPlayer;

      if (!firstname || !lastname || !kitNumber) {
        return res.status(400).json({ msg: "Provide player details" });
      }

      // check if kitNumber is already added
      const existingPlayer = await Player.findOne({ kitNumber });

      if (existingPlayer) {
        return res.status(400).json({ msg: "Player already exists" });
      }

      const player = await Player.create({ firstname, lastname, kitNumber });

      return res.status(201).json(player);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async updatePlayer(req: Request, res: Response) {
    try {
      const { firstname, lastname, kitNumber } = req.body as IPlayer;
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ msg: "Player ID is required" });
      }

      // check if kitNumber is already added
      const existingPlayer = await Player.findOne({ _id: id });

      if (!existingPlayer) {
        return res.status(404).json({ msg: "Player not found" });
      }

      const player = await Player.findOneAndUpdate({ _id: id }, { firstname, lastname, kitNumber }, { new: true });

      return res.status(200).json(player);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async removePlayer(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ msg: "Player ID is required" });
      }

      // check if kitNumber is already added
      const existingPlayer = await Player.findOne({ _id: id });

      if (!existingPlayer) {
        return res.status(404).json({ msg: "Player not found" });
      }

      const deletedPlayer = await Player.findOneAndRemove({ _id: id });
      if (deletedPlayer) {
        return res.status(204).json({ msg: "Player deleted" });
      }
      return res.status(400).json({ msg: "Could not delete player" });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default PlayersController;
