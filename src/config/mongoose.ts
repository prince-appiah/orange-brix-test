import mongoose from "mongoose";

mongoose.Promise = Promise;

export const connectDatabase = async () => {
  try {
    const dbUrl = "mongodb://localhost:27017/orange-brix";

    await mongoose.connect(dbUrl, { autoCreate: true });

    if (process.env.NODE_ENV === "development") {
      mongoose.set("debug", true);
    }

    mongoose.connection.on("error", (error) => {
      console.log("MongoDB connection error:", error.message);
      process.exit(-1);
    });

    return mongoose.connection;
  } catch (error: any) {
    console.log("Error connecting to database:> ", error.message);
  }
};
