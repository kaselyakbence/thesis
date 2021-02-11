const mongoose = require("mongoose");

const connect = async () => {
  console.log("Connecting...");
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  connect,
};
