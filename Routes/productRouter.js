import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, deleteProduct, updateProduct } from '../Controllers/productController.js';

const router = Router();

router.get('/allProducts', getAllProducts)

router.get('/product/:id', getProductById)

router.post('/create', createProduct)

router.put('/:id/updateProduct', updateProduct)

router.delete('/:id/deleteProduct', deleteProduct)    

export default router;