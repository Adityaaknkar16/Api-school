const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('CRITICAL ERROR: MONGODB_URI environment variable is missing.');
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/api_playground');
    console.log('MongoDB Atlas connected successfully.');
  } catch (err) {
    console.error('MongoDB Connection Failure:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
