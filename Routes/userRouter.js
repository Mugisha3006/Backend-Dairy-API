import { Router } from 'express';
import { createUser, getAllUsers } from '../Controllers/userController.js';


const router = Router();

router.get('/', getAllUsers)

router.post('/register', createUser)

export default router;