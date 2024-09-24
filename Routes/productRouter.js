import { Router } from 'express';
import { createProduct, getAllProducts } from '../Controllers/productController.js';

const router = Router();

router.get('/', getAllProducts)

router.post('/create', createProduct)

export default router;