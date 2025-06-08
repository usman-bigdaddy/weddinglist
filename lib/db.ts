import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    // Already connected or connecting
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw new Error('MongoDB connection failed.');
  }
};

export default dbConnect;
