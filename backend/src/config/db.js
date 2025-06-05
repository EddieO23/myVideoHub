import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDb = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB');
    return connection;
  } catch (error) {
    console.error(`Error connecting to the DB: ${error}`);
    throw error;
  }
};

export default connectDb;
