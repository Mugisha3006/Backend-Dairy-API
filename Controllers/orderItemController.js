import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

// Add to order/ create an orderItem
const createOrderItem = async (req, res) => {
    try {
        const { quantity, price, productId, orderId } = req.body;
        const orderItem = await prisma.orderItem.create({
            data: {
                quantity, price,
                product: {
                    connect: { id: productId }
                },
                Order: {
                    connect: { id: orderId }
                }
            }
        });
        res
            .status(StatusCodes.CREATED)
            .json({
                message: "OrderItem created successfully",
                orderItem: { id: orderItem.id, quantity: orderItem.quantity, price: orderItem.price }
            });
    } catch (err) {
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({
                message: "Unable to create orderItem",
                error: err.message
            })
    }
}; 

// remove from Order
const deleteOrderItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteOrderItem = await prisma.orderItem.delete({
            where: {
                id
            }
        });
        res
            .status(StatusCodes.OK)
            .json({ message: "OrderItem deleted successfully" })
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "orderItem not found", err
        })
    }
};

export {createOrderItem, deleteOrderItemById}