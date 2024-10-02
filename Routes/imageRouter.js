import { Router } from "express";
import { createImage, getAllImages, getImageById, updateImageById, deleteImageById } from "../Controllers/imageController.js"

const router = Router();

router.get('/allImages', getAllImages)

router.post('/create', createImage)

router.get('/image/:id', getImageById)

router.patch('/:id/updateImage', updateImageById)

router.delete('/:id/deleteImage', deleteImageById)

export default router;