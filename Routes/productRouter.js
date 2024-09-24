import { Router } from 'express';
import { createProduct } from '../Controllers/productController.js';

const router = Router();

router.post('/create', createProduct)

export default router;