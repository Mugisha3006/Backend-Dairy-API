import { Router } from 'express';
import { createUser, getAllUsers, updateUserById, deleteUserById, loginUser } from '../Controllers/userController.js';
import { userSchema, validate } from '../utils/data-validator.js';


const router = Router();

router.get('/', getAllUsers)

router.post('/register',validate(userSchema), createUser)

router.post('/login', loginUser)

router.patch('/:id', updateUserById)

router.delete('/:id', deleteUserById)

export default router;