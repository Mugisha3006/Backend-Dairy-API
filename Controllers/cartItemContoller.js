import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

// Add to cart/ create a cartItem
const createCartItem = async (req, res) => {
    try {
        const { quantity, price, productId, cartId } = req.body;
        const cartItem = await prisma.cartItem.create({
            data: {
                quantity, price,
                product: {
                    connect: { id: productId }
                },
                cart: {
                    connect: { id: cartId }
                }
            }
        });
        res
            .status(StatusCodes.CREATED)
            .json({
                message: "CartItem created Successfully",
                cartItem: { id: cartItem.id, quantity: cartItem.quantity, price: cartItem.price }
            });
    } catch (err) {
        console.error("Error creating cartItem", err.message);
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                message: "Unable to create cartItem",
                error: err.message
            })
    }
};

// remove cart/ delete cartItem
const deleteCartItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCartItem = await prisma.cartItem.delete({
            where: {
                id
            }
        });
        res
            .status(StatusCodes.OK)
            .json({ message: "CartItem deleted successfully" })
        
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "cartItem not found", err
        })
    }
};

export {createCartItem, deleteCartItemById}
