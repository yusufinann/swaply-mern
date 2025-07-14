import express from 'express';
import { getMyChats, getOrCreateChat, getChatMessages, getChatById } from '../controllers/communityChat.controller.js';
import authenticateUser from '../middleware/authenticateUser.js';

const router = express.Router();

router.use(authenticateUser);

router.get('/', getMyChats);
router.post('/initiate', getOrCreateChat);
router.get('/:chatId/messages', getChatMessages);
router.get('/:chatId', getChatById);

export default router;