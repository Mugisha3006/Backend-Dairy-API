import { Router } from 'express';
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategoryById } from '../Controllers/categoryController.js';

const router = Router();

router.get('/allCategories', getAllCategories)

router.post('/create', createCategory)

router.get('/singleCategory/:id', getCategoryById)

router.put('/:id/updateCategory', updateCategory)

router.delete('/:id/deleteCategory', deleteCategoryById)

export default router;