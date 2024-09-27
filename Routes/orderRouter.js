import { Router } from 'express';
import { createOrder } from '../Controllers/orderController.js'

const router = Router();

router.post('/create', createOrder)

export default router;