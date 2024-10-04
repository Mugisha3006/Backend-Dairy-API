import { Router } from "express";
import { createCartItem, deleteCartItemById } from '../Controllers/cartItemContoller.js';

const router = Router();

router.post('/create', createCartItem)

router.delete('/:id/deleteCartItem', deleteCartItemById)

export default router; 