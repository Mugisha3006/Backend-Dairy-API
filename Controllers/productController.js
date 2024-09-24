import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

// get all products
const getAllProducts = async (req, res) => {
    try {
        const allProducts = await prisma.product.findMany();
        res
            .status(StatusCodes.OK)
            .json({
                products: allProducts
            });
    } catch (err) {
        res
            .json({ message: "Can't get Products", err });
    }
};

// get product by id
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await prisma.product.findUnique({
            where: {
                id: id
            },
        });
        if (product) {
            res.status(StatusCodes.OK).json({
                message: "Product got successfully",
                product: product
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                message:"Product id doesn't exist"
            })
        };
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "id doesn't exist", err });
    };
}

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

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, price, quantity } = req.body;
        const updatedProduct = await prisma.product.update({
            where: {
                id
            },
            data: {
                name,
                description,
                price,
                quantity
            }
        });
        res.status(StatusCodes.OK).json({
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "id doesn't exist", err });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await prisma.product.delete({
            where: {
                id
            }
        });
        res.status(StatusCodes.OK).json({
            message: "Product deleted successfully",
            product: product
        });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "id doesn't exist", err });
    }
}

export { createProduct, getAllProducts, getProductById, deleteProduct, updateProduct }