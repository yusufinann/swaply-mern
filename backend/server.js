import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import express from 'express';
import connectToMongoDb from './db/connectToMongoDb.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Hello from Takasta backend!'));

async function initializeApp() {
  try {
    const mongoUri = process.env.MONGO_DB_URI;
    if (!mongoUri) throw new Error('MONGO_DB_URI is not defined');
    await connectToMongoDb(mongoUri);

    const PORT = process.env.PORT || 3001;
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
    });
  } catch (err) {
    console.error('Critical error while starting the application:', err);
  }
}

initializeApp();
