import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DataBase Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
  }
};

export default connectDB;
