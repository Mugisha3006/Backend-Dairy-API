import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

//  create an order
const createOrder = async (req, res) => {
    try {
        const { id } = req.body;
        const newOrder = await prisma.order.create({
            data: {
                ...req.body
            }
        });
        
        res
            .status(StatusCodes.CREATED)
            .json({
                message: "Order created successfully",
                order: { id: newOrder.id }
            })
    } catch (err) {
        console.error("Error creating Order:", err)
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Unable to create order" })
    }
};

export { createOrder}

