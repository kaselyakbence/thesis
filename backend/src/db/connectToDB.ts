import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const env = process.env.APP_ENV || "development";

//Function to connect to MongoDB based on enviroment
const connect = async (): Promise<void> => {
  if (env === "production") {
    //Connection to MongoDB Atlas
    try {
      await mongoose.connect(process.env.DB_CONNECTION ?? "", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log("Connected to MongoDB");
    } catch (e) {
      console.log(e);
    }
  } else {
    //Connecting to local MongoDB instance
    const mongo = new MongoMemoryServer();

    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDB development");
  }
};

export { connect };
