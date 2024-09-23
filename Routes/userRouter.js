import { Router } from 'express';
import { createUser } from '../Controllers/userController.js';


const router = Router();

router.post('/register', createUser)

export default router;