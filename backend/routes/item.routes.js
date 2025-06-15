import express from 'express';
import {
  createItem,
  getMyItems,
  getItemById,
  updateItem,
  deleteItem,
  getAllAvailableItems
} from '../controllers/item.controller.js';
import authenticateUser from '../middleware/authenticateUser.js'; 

const router = express.Router();

router.route('/')
  .post(authenticateUser, createItem); 

router.route('/my-items')
  .get(authenticateUser, getMyItems); 

router.route('/:id')
  .get(getItemById) // Get a single item by ID (can be public or further restricted)
  .put(authenticateUser, updateItem) // Update an item
  .delete(authenticateUser, deleteItem); // Delete an item

router.route('/all/available') 
    .get(getAllAvailableItems);


// You might also want a general public route to list all items (or filter them)
// For example:
// router.get('/public', getAllPublicItemsControllerFunction);

export default router;