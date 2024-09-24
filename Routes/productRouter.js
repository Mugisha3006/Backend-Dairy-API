import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, deleteProduct, updateProduct } from '../Controllers/productController.js';
import { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById } from '../Controllers/productController.js';

const router = Router();

router.get('/allProducts', getAllProducts)

router.get('/:id', getProductById)

router.post('/create', createProduct)

export default router;