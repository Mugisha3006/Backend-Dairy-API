import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

// Create a new product 
const createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity } = req.body;
        const newProduct = await prisma.product.create({
            data: {
                ...req.body
            }
        });
        
        res.status(StatusCodes.CREATED).json({
            message: "Product created successfully",
            product: { id: newProduct.id, name: newProduct.name, description: newProduct.description }
        })
    } catch (err) {
        console.error("Error creating product:", err);
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Unable to Create Product" });
    }
};

export {createProduct}