import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, deleteProductById, updateProductById }  from '../Controllers/productController.js';

const router = Router();

router.get('/allProducts', getAllProducts)

router.get('/product/:id', getProductById)

router.post('/create', createProduct)

router.put('/:id/updateProduct', updateProductById)

router.delete('/:id/deleteProduct', deleteProductById)    

export default router;