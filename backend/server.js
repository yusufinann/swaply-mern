import dotenv from 'dotenv';
dotenv.config(); 

import http from 'http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectToMongoDb from './db/connectToMongoDb.js';
import authRoutes from './routes/auth.routes.js'; 
import itemRoutes from './routes/item.routes.js'; 
import favoritesRoutes from './routes/favorite.Routes.js'
import chatRoutes from './routes/communityChat.routes.js';
import { initializeWebSocketServer } from './websocket/websocketServer.js'; 
import config from './config/config.js'; 

const app = express();

// Middleware'ler
app.use(express.json()); // Gelen JSON verilerini parse etmek için
app.use(express.urlencoded({ extended: true })); // Gelen URL-encoded verileri parse etmek için

// CORS ayarları
app.use(cors({
  origin: config.frontendUrl, // Frontend'den gelen isteklere izin ver
  credentials: true // Cookie'lerin gönderilmesine izin ver
}));

// Cookie'leri parse etmek için
app.use(cookieParser());

// Ana Rota (Health Check için)
app.get('/', (req, res) => res.send('Merhaba, Takasta backend API çalışıyor!'));

// API Rotaları
app.use('/api/auth', authRoutes); 
app.use('/api/items', itemRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/community-chats', chatRoutes); // YENİ: Sohbet rotalarını ekliyoruz

// Global Hata Yakalama Middleware'i
app.use((err, req, res, next) => {
  console.error("Beklenmeyen Hata:", err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Sunucuda bir şeyler ters gitti!';
  res.status(statusCode).json({ success: false, message });
});

/**
 * Uygulamayı başlatan asenkron fonksiyon.
 * Önce veritabanına bağlanır, sonra sunucuyu başlatır.
 */
async function initializeApp() {
  try {
    // 1. Veritabanına bağlan
    const mongoUri = process.env.MONGO_DB_URI;
    if (!mongoUri) {
      throw new Error('MONGO_DB_URI .env dosyasında tanımlanmamış!');
    }
    await connectToMongoDb(mongoUri);

    // 2. Express uygulamasından bir HTTP sunucusu oluştur
    // WebSocket sunucusu bu HTTP sunucusuna bağlanacak.
    const server = http.createServer(app);

    // 3. WebSocket sunucusunu başlat ve HTTP sunucusuna bağla
    initializeWebSocketServer(server);

    const PORT = process.env.PORT || 3001;

    // 4. Sunucuyu dinlemeye başla (app.listen yerine server.listen)
    server.listen(PORT, () => {
      console.log(`Sunucu ${PORT} portunda çalışıyor (HTTP ve WebSocket).`);
      console.log(`Uygulama Ortamı: ${config.env}`);
      console.log(`Frontend URL (CORS için izinli): ${config.frontendUrl}`);
    });

  } catch (err) {
    console.error('Uygulama başlatılırken kritik bir hata oluştu:', err.message);
    process.exit(1); 
  }
}
initializeApp();