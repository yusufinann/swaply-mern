import express from 'express'
import { addFavorites, getMyFavorites, removeFavorites } from '../controllers/favorite.controller.js';
import authenticateUser from '../middleware/authenticateUser.js';


const router = express.Router();
router.post('/:itemId', authenticateUser,addFavorites);
router.delete('/:itemId', authenticateUser,removeFavorites);
router.get('/me', authenticateUser, getMyFavorites); // '/me' 

export default router;