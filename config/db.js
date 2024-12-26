// connectToMongo.js
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI; // Make sure your Mongo URI is set

const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // Exit if connection fails
  }
};

// Export the function
module.exports = connectToMongo;
