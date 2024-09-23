import { Router } from 'express';
import { createUser, getAllUsers, getUserById } from '../Controllers/userController.js';


const router = Router();

router.get('/', getAllUsers)

router.post('/register', createUser)

router.get('/:id', getUserById)

export default router;