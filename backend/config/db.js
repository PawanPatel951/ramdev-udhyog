const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGO_URL;

    if (!mongoURL) {
      throw new Error("MONGO_URL is missing in .env file");
    }

    const conn = await mongoose.connect(mongoURL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error("MongoDB Connection Error:");
    console.error(error.message);

    process.exit(1);
  }
};

module.exports = connectDB;