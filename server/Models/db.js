import mongoose from 'mongoose';

const mongo_url = process.env.MONGODB_CONN;

const connectDB = () => {
  if (!mongo_url) {
    console.log('MongoDB connection string is missing. Please check the .env file.');
    process.exit(1);
  }

  mongoose
    .connect(mongo_url, {
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
      console.log('Could not connect to MongoDB', err);
    });
};

export default connectDB;  // Default export
