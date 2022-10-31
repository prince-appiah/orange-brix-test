import { model, Schema } from "mongoose";
import { IPlayer, IUser } from "../interfaces/models.interface";

const playerModel = new Schema<IPlayer>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  kitNumber: {
    type: Number,
    unique: true,
    required: true,
  },
});

const Player = model("Player", playerModel);

export default Player;
