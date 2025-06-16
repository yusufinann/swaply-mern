import dotenv from 'dotenv';
dotenv.config(); 

import http from 'http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectToMongoDb from './db/connectToMongoDb.js';
import authRoutes from './routes/auth.routes.js'; 
import config from './config/config.js'; 
import itemRoutes from './routes/item.routes.js'; 
import favoritesRoutes from './routes/favorite.Routes.js'
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.use(cors({
  origin: config.frontendUrl, 
  credentials: true 
}));

app.use(cookieParser());

// Ana Rota
app.get('/', (req, res) => res.send('Merhaba, Takasta backend API çalışıyor!'));

// API Rotaları
app.use('/api/auth', authRoutes); 
app.use('/api/items', itemRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use((err, req, res, next) => {
  console.error("Beklenmeyen Hata:", err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Sunucuda bir şeyler ters gitti!';
  res.status(statusCode).json({ success: false, message });
});


async function initializeApp() {
  try {
    const mongoUri = process.env.MONGO_DB_URI; // .env'den alınıyor
    if (!mongoUri) {
      throw new Error('MONGO_DB_URI .env dosyasında tanımlanmamış!');
    }
    await connectToMongoDb(mongoUri);

    const PORT = process.env.PORT || 3001; // .env'den alınıyor
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Sunucu ${PORT} portunda çalışıyor.`);
      console.log(`Uygulama Ortamı: ${config.env}`);
      console.log(`Frontend URL (CORS için izinli): ${config.frontendUrl}`);
    });
  } catch (err) {
    console.error('Uygulama başlatılırken kritik bir hata oluştu:', err.message);
    process.exit(1); 
  }
}

initializeApp();