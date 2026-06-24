const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    let uri = MONGODB_URI;
    
    // Fall back to an in-memory database if connection string is missing or placeholder
    if (!uri || uri.includes('user:pass') || uri === 'memory') {
      console.log('💡 Spinning up an In-Memory MongoDB Server for offline testing...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
    }

    await mongoose.connect(uri);
    console.log('MongoDB connection initialized.');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
