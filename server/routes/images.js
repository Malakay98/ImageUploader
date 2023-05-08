import express from 'express';
import { createImage, deleteImageById, getAllTheImages, getImageFromId } from '../controllers/images.js';
import authMiddleware from '../controllers/auth.js';
import upload from '../controllers/fileUploader.js';

const router = express.Router();


// Get All the Images
router.get('/', authMiddleware, getAllTheImages);

// Get an specific image
router.get('/:id', authMiddleware, getImageFromId)

// Create new image
router.post('/', authMiddleware, upload.single('image'), createImage);

// Delete image by the id
router.delete('/:id', authMiddleware, deleteImageById);


export default router;