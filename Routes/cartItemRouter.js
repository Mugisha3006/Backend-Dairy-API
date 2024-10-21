import { Router } from "express";
import { getAllCartItems, createCartItem, deleteCartItemById } from '../Controllers/cartItemContoller.js';

const router = Router();

router.get('/allCartItems', getAllCartItems)

router.post('/create', createCartItem)

router.delete('/:id/deleteCartItem', deleteCartItemById)

export default router; 