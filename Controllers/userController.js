import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { createJWTtoken } from '../utils/jwt-handler.js';
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
        res.status(StatusCodes.NOT_FOUND).json({ message: "Can't get users!", err })
    }
};

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
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

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

const loginUser = async (req, res) => {
    try{
            const { email, password } = req.body;
            
            if(!email || !password){
                return res.status(StatusCodes.NOT_FOUND).json({ message: "Email and Password are required" });
            }

            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            });

            const verifyPassword = await bcrypt.compare(password, user.password);
            if (verifyPassword) {
                let data = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
                const accesstoken = createJWTtoken(data);
                return res.status(StatusCodes.OK).json({ message: "User logged in successfully", token: accesstoken, user });
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: "Invalid Password" });
            }
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Unable to login user" , error:err.message});
    }
}

// update the exisiting user by id
const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;

        let hashedPassword

        if (req.body.password) {
            const salt = await bcrypt.genSalt();
            return hashedPassword = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                ...req.body,
                password: hashedPassword
            }
        });

        res
            .status(StatusCodes.CREATED)
            .json({ message: "User updated", user: updatedUser })
    } catch (err) {
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "User not updated", err })
    }
};

// delete user by id
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params
        const deleteUser = await prisma.user.delete({
            where: {
                id
            }
        });
        res
            .status(StatusCodes.OK)
            .json({message:"User Successfully Deleted"})
    } catch (err) {
        if (err.code === 'P2025') {
            res.status(StatusCodes.BAD_REQUEST).send('User not found!');  
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Failed to delete User')
        }
    }
}

export { createUser, getAllUsers, updateUserById, deleteUserById, loginUser }