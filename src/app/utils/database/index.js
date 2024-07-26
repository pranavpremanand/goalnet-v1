import mongoose from "mongoose";

const connection = {};
export async function connectDb() {
  try {
    if (connection.isConnected) {
      console.log("Using existing database connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_URL);
    connection.isConnected = db.connections[0].readyState;
  } catch (err) {
    throw new Error("Database connection failed :\n", err);
  }
  // try {
  //   mongoose.connect(process.env.MONGO_URL);
  //   const connection = mongoose.connection;

  //   connection.on("connected", () => {
  //     console.log("Database connected successfully!");
  //   });

  //   connection.on("error", (err) => {
  //     console.log(
  //       "Database connection error. Please make sure Database is running.\n",
  //       err
  //     );
  //     process.exit();
  //   });
  // } catch (err) {
  //   console.log("Database connection failed :\n", err);
  // }
}
