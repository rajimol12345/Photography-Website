const mongoose = require('mongoose');

let gfs;

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not defined. Please ensure your .env file is correctly configured and loaded.');
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Initialize GridFS bucket
    const db = conn.connection.db;
    gfs = new mongoose.mongo.GridFSBucket(db, {
      bucketName: 'uploads'
    });
    
    return conn; 
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error; 
  }
};

const getGfs = () => {
  if (!gfs) {
    throw new Error('GridFS not initialized. Call connectDB first.');
  }
  return gfs;
};

module.exports = { connectDB, getGfs };
