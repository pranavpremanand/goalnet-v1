import mongoose from "mongoose";

const connection = {};

export async function connectDb() {
  try {
    // Check if the connection already exists
    if (connection.isConnected) {
      console.log("Using existing database connection");
      return;
    }

    // If no connection exists, create a new one
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
    });

    // Set the connection state
    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    throw new Error("Database connection failed");
  }

  // try {
  //   if (connection.isConnected) {
  //     console.log("Using existing database connection");
  //     return;
  //   }
  //   const db = await mongoose.connect(process.env.MONGO_URL);
  //   connection.isConnected = db.connections[0].readyState;
  // } catch (err) {
  //   throw new Error("Database connection failed :\n", err);
  // }
}
