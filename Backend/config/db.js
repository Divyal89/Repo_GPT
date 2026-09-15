import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB is connected");
  } catch (error) {
    console.error("err occur");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
