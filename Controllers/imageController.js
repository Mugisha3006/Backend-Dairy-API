import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();

// get all images
const getAllImages = async (req, res) => {
    try {
        const allImages = await prisma.image.findMany()
        res
            .status(StatusCodes.OK)
            .json({
                images: allImages
            });
    } catch (err) {
        res.json({ message: "Can't get Images", err })
    }
};

// get image by id 
const getImageById = async (req, res) => {
    try {
        const id = req.params.id;
        const image = await prisma.image.findUnique({
            where: {
                id
            }
        });
        if (image) {
            res.status(StatusCodes.OK).json({
                message: "Image got successfully",
                image: image
            })
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                message:"Image id doesn't exist"
            })
        }
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({message: "Id doesn't exist", err})
    }
}

// create a new image
const createImage = async (req, res) => {
    try {
        const { url, productId } = req.body;

        const newImage = await prisma.image.create({
            data: {
                url,
                product: {
                    connect: { id: productId }  // Connect the image to an existing product using its ID
                }
            }
        });

        res.status(StatusCodes.CREATED).json({
            message: "Image created successfully",
            image: { id: newImage.id, url: newImage.url }
        });
    } catch (err) {
        console.error("Error creating Image:", err.message);
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Unable to create Image",
            error: err.message
        });
    }
};

// update the existing image by id
const updateImageById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedImage = await prisma.image.update({
            where: {
                id
            },
            data: {
                ...req.body
            }
        });
        res
            .status(StatusCodes.CREATED)
            .json({ message: "Image Updated", image: updatedImage })
    } catch (err) {
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Image not Updated", err })
    }
};

// delete image by id 
const deleteImageById = async (req, res) => {
    try {
        const { id } = req.params
        const deleteImage = await prisma.image.delete({
            where: {
                id
            }
        });
        res
            .status(StatusCodes.OK)
            .json({message: "Image successfully deleted"})
    } catch (err) {
        if (err.code === 'P2025') {
            res.status(StatusCodes.BAD_REQUEST).send("Image not found")
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Failed to delete Image")
        }
    }
}

export { createImage, getAllImages, getImageById, updateImageById, deleteImageById }