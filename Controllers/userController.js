import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// get all users
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await prisma.user.findMany();

        res.status(StatusCodes.OK).json({
            users: allUsers
        });
    } catch (err) {
        res.json({ message: "Can't get all users!", err })
    }
};

// get user by id
const getUserById = async (req, res) => {
    try {
        const id = +req.params.id;

        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (user) {
            res.status(StatusCodes.OK).json({
                message: "User got Successfully",
                user: user,
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "User id doesn't exist"
            })
        };
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "id doesn't exist", err });
    }
}

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

export { createUser, getAllUsers, getUserById }