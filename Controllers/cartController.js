import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

// get all carts
const getAllCarts = async (req, res) => {
    try {
        const allCarts = await prisma.cart.findMany();
        res
            .status(StatusCodes.OK)
            .json({
                carts: allCarts
            });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Can't get Carts", err
        })
    }
};

// get cart by id 
const getCartById = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await prisma.cart.findUnique({
            where: {
                id
            }
        })
        if (cart) {
            res.status(StatusCodes.OK).json({
                message: "Cart got successfully",
                cart: cart
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                message:"product id doesn't exist"
            })
        };
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({message: "Id doesn't exist", err})
    }
}

// create a new cart
const createCart = async (req, res) => {
    try {
        const { id } = req.body;
        const newCart = await prisma.cart.create({
            data: {
                ...req.body
            }
        });
        res
            .status(StatusCodes.CREATED).json({
                message: "Cart created successfully",
                cart: { id: newCart.id }
            })
    } catch (err) {
        console.error("Error in creating cart:", err);
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Unable to create Cart" })
    }
};

// update cart
const updateCart = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedCart = await prisma.cart.update({
            where: {
                id
            },
            data: {
                ...req.body
            }
        });
        res.status(StatusCodes.OK).json({
            message: "Cart updated successfully",
            cart: updatedCart
        });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Id doesn't exist", err })
    }
}; 

// delete cart
const deleteCartById = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await prisma.cart.delete({
            where: {
                id
            }
        });
        res
            .status(StatusCodes.OK).json({
                message: "Cart deleted successfully",
                cart: cart
            });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Id deosn't exist", err })
    }
};

export { createCart, getAllCarts, getCartById, updateCart, deleteCartById }