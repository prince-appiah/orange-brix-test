import { Model, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser, IUserMethods } from "../interfaces/models.interface";

type UserModel = Model<IUser, {}, IUserMethods>;

const userModel = new Schema<IUser, {}, IUserMethods>({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userModel.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userModel.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

const User = model("User", userModel);

export default User;
