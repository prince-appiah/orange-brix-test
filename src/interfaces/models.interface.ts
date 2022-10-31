// USERS
export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

//  PLAYERS
export interface IPlayer {
  firstname: string;
  lastname: string;
  kitNumber: number;
}
