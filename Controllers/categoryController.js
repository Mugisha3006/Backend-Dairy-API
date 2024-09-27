import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

//get all categories
const getAllCategories = async (req, res) => {
    try {
        const allCategories = await prisma.category.findMany()

        res.status(StatusCodes.OK).json({
            categories: allCategories
        });
    } catch (err) {
        res
            .json({ message: "Can't get Categories", err })
    }
}; 

// get category by id 
const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;

        const category = await prisma.category.findUnique({
            where: {
                id
            }
        });
        if (category) {
            res.status(StatusCodes.OK).json({
                message: "Category got successfully",
                category: category
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                message:"Category id doesn't exist"
            })
        };
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({message: "Id doesn't exist", err})
    }
}

// const create a new category
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body
        const newCategory = await prisma.category.create({
            data: {
                ...req.body
            }
        });
        res.status(StatusCodes.CREATED).json({
            message: "Category created successfully",
            category: { id: newCategory.id, name: newCategory.name, description: newCategory.description }
        })
    } catch (err) {
        console.error("Error creating category:", err)
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Unable to create Category" })
    };
};

// update category
const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description } = req.body;
        const updateCategory = await prisma.category.update({
            where: {
                id
            },
            data: {
                name,
                description
            }
        });
        res.status(StatusCodes.OK).json({
            message: "Category updated Sucessfully",
            category: updateCategory
        });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Id doesn't exist" })
    }
}; 

// delete category by id
const deleteCategoryById = async (req,res) => {
    try {
        const { id } = req.params;
        const deleteCategory = await prisma.category.delete({
            where: {
                id
            }
        });
        res
            .status(StatusCodes.OK)
            .json({message:"Category Successfully Deleted"})
    } catch (err) {
        if (err.code === "P2025") {
            res.status(StatusCodes.BAD_REQUEST).send("Category not found")
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Failed to delete Category")
        }
    }
}

export { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategoryById }