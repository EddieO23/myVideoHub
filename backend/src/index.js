import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import routes from './route/index.js';
import passportJwtStrategy from './config/passportJwtStragetgy.js';
import connectDb from './config/db.js';

// For local development
const app = express();
dotenv.config();

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

// Only run server if directly executed
if (import.meta.url === `file://${process.argv[1]}`) {
  connectDb().then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }).catch(console.error);
}


