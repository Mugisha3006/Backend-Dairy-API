import { Router } from 'express';
import { createProduct, getAllProducts, getProductById } from '../Controllers/productController.js';

const router = Router();

router.get('/', getAllProducts)

router.get('/:id', getProductById)

router.post('/create', createProduct)

export default router;