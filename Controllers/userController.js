import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if the user with the given email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "User with email already exists" })
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const newUser = await prisma.user.create({
            data: {
                ...req.body,
                password: hashedPassword
            }
        });

        // return success response
        res.status(StatusCodes.CREATED).json({
            message: "User registered Successfully",
            user: { id: newUser.id, email: newUser.email, name: newUser.name }
        });
    } catch (err) {
        // log error for debugging purposes
        console.error('Error creating user:', err.message, err);

        res.status(StatusCodes.BAD_REQUEST).json({ message: "Unable to register user" , error:err.message});
    }
};

export { createUser}