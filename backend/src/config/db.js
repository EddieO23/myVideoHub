import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error(`Error in connecting to th DB, ${error}`);
  }
};

export default connectDb;
