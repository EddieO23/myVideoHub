import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import routes from './route/index.js';
import passportJwtStrategy from './config/passportJwtStragetgy.js';
import connectDb from './config/db.js';

// Create a function that sets up the Express app
export default async function createApp(req, res) {
  const app = express();

  // Ensure environment is configured
  dotenv.config();

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

  app.use(cors(corsOptions));
  app.use(passportJwtStrategy.initialize());

  app.get('/', (req, res) => {
    res.send('Hello world.');
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api/v1', routes);

  // Handle the request
  return app(req, res);
}

// For local development
if (import.meta.url === `file://${process.argv[1]}`) {
  const app = express();
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
