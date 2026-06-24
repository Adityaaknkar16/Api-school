require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const connectDB = require('./database');
const seedDatabase = require('./seed/seed');
const errorHandler = require('./middleware/errorHandler');

const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');
const teacherRoutes = require('./routes/teachers');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas, then Seed & Listen
connectDB().then(async () => {
  try {
    await seedDatabase();
  } catch (err) {
    console.error('Failed to run initial database seeding:', err);
  }

  // 1. Helmet - secure HTTP headers
  app.use(helmet());

  // 2. CORS - locked to frontend domain only
  const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost'];
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  // 3. Rate limiting - 100 requests per 15 min per IP
  const limitWindow = parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;
  const limitMax = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100;
  const limiter = rateLimit({
    windowMs: limitWindow,
    max: limitMax,
    message: { status: 'error', message: 'Too many requests, please try again later.' }
  });
  app.use('/api/', limiter);

  // 4. Stricter limit on reset endpoint - 5 per hour
  const resetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: { status: 'error', message: 'Reset limit reached. Try again in 1 hour.' }
  });

  // 5. Data sanitization
  app.use(mongoSanitize());
  app.use(xss());
  app.use(hpp());

  // 6. Body size limit
  app.use(express.json({ limit: '10kb' }));

  // 7. Compression
  app.use(compression());

  // Health Check Endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'success',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // Reset Database Endpoint
  app.post('/api/reset', resetLimiter, async (req, res, next) => {
    try {
      await seedDatabase(true);
      res.json({
        status: 'success',
        message: 'Database has been reset to original seed data.'
      });
    } catch (error) {
      next(error);
    }
  });

  // Register Entity Routes
  app.use('/api/students', studentRoutes);
  app.use('/api/courses', courseRoutes);
  app.use('/api/teachers', teacherRoutes);

  // Fallback for unhandled routes
  app.use('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server`);
    err.statusCode = 404;
    next(err);
  });

  // Global Error Handler
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'production'} mode on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize MongoDB connection:', err);
  process.exit(1);
});
