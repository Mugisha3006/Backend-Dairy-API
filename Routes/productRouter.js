import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById } from '../Controllers/productController.js';

const router = Router();

router.get('/', getAllProducts)

router.get('/:id', getProductById)

router.patch('/:id', updateProductById)

router.post('/create', createProduct)

router.delete('/:id', deleteProductById)

export default router;