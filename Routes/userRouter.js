import { Router } from 'express';
import { createUser, getAllUsers, getUserById, updateUserById } from '../Controllers/userController.js';


const router = Router();

router.get('/', getAllUsers)

router.post('/register', createUser)

router.get('/:id', getUserById)

router.patch('/:id', updateUserById)

export default router;