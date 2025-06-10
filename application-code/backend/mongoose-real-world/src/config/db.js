import mongoose from "mongoose";

export async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}