import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import routes from '../src/route/index.js';
import passportJwtStrategy from '../src/config/passportJwtStragetgy.js';
import connectDb from '../src/config/db.js';

// Serverless handler for Vercel
export default async function handler(req, res) {
  // Ensure environment is configured
  dotenv.config();

  // Create Express app
  const app = express();

  // Connect to database
  try {
    await connectDb();
  } catch (error) {
    console.error('Database connection failed', error);
    return res.status(500).json({ error: 'Database connection failed' });
  }

  // CORS configuration
  const corsOptions = {
    origin: [
      'http://localhost:5173',
      'https://my-video-hub-dusky.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
  };

  // Middleware
  app.use(cors(corsOptions));
  app.use(passportJwtStrategy.initialize());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.get('/', (req, res) => {
    res.send('Hello world.');
  });

  app.use('/api/v1', routes);

  // Handle the request
  return new Promise((resolve, reject) => {
    app(req, res, (err) => {
      if (err) {
        console.error('Express error:', err);
        return reject(err);
      }
      resolve();
    });
  });
}
