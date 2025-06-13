import express from 'express';
import { register, login, getMe, logout } from '../controllers/auth.controller.js';
import authenticateUser from '../middleware/authenticateUser.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateUser, getMe); // /me rotasını korumak için
router.post('/logout', logout); // Çıkış için authenticateUser gerekmez, cookie silinir

export default router;