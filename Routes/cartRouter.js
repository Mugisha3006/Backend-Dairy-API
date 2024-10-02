import { Router } from 'express';
import { createCart, deleteCartById, getAllCarts, getCartById, updateCart } from '../Controllers/cartController.js';

const router = Router();

router.get('/allCarts', getAllCarts)

router.post('/create', createCart)

router.get('/cart/:id', getCartById)

router.patch('/:id/updateCart', updateCart)

router.delete('/:id/deleteCart', deleteCartById)

export default router;