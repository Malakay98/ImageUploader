import Image from '../models/images.js';


// Get all the images
export const getAllTheImages = async (req, res) => {
    try {
        const images = await Image.getAllImages();
        res.json({ images })
    } catch (error) {
        console.error(err);
        res.status(500).send('Server Error!' + err);
    }
};

// Get Image from the id
export const getImageFromId = async (req, res) => {
    const { id } = req.params;
    try {
        const image = await Image.getImageById(id)
        if (image) {
            res.json({ image })
        } else {
            res.status(404).send('Image not found')
        }
    } catch (error) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

export const createImage = async (req, res) => {
    const { filename, path: url } = req.file; // Get filename and path from req.file object
    const uploaderId = req.user.idusers; // Get uploader_id from decoded token
    console.log('filename:', filename);
    console.log('url:', url);
    console.log('uploaderId:', uploaderId);
    try {
        const image = await Image.createImage(filename, url, uploaderId);
        res.json({ msg: 'Image created successfully', image });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
    }
};

export const deleteImageById = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Image.deleteById(id);
        if (deleted) {
            res.json({ msg: 'Image deleted successfully' });
        } else {
            res.status(404).send('Image not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

export const updateImage = async (req, res) => {
    const { id } = req.params;
    const { filename, url, uploader_id } = req.body;
    try {
        const updated = await Image.updateImage(id, filename, url, uploader_id);
        if (updated) {
            res.json({ msg: 'Image updated successfully' });
        } else {
            res.status(404).send('Image not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};