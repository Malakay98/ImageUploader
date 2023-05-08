import db from '../database/db.js';

// Image Model
export const Image = {
    // Get All The Images
    getAllImages: async function () {
        const conn = await db.getConnection();
        const [results, fields] = await conn.execute('SELECT * FROM images')
        conn.release();
        return results;
    },

    // Get an specific image by the id
    getImageById: async function (id) {
        const conn = await db.getConnection();
        const [results, fields] = await conn.execute('SELECT * FROM images WHERE idimages = ?', [id]);
        conn.release();
        if (results.length > 0) {
            return results[0]; //Return the image object
        }
        return null;//Return null if image not found
    },
    // Create a new Image
    createImage: async function (filename, url, uploaderId) {
        const conn = await db.getConnection();
        const [results, fields] = await conn.execute(
            'INSERT INTO images (filename, url, uploaded_at, uploader_id) VALUES (?, ?, NOW(), ?)',
            [filename, url, uploaderId]
        );
        conn.release();
        return results.insertId;
    },

    deleteById: async function (id) {
        const conn = await db.getConnection();
        // The first argument is a SQL statement, the second one is an array that contains the value/s of the parameter/s to be substituted in place of the ? placeholder in the SQL statement
        const [results, fields] = await conn.execute('DELETE FROM images WHERE idimages = ?', [id]);
        conn.release();
        // Return the number of rows that were affected by the SQL query that was executed
        return results.affectedRows > 0;
    },

    // Save image to database
    saveImage: async function (image) {
        const conn = await db.getConnection();
        const [result] = await conn.execute(
            'UPDATE images SET filename=?, url=?, uploader_at=?, updated_at=?, uploader_id=? WHERE idimages=?',
            [image.filename, image.url, image.uploader_at, image.updated_at, image.uploader_id, image.idimages]
        );
        conn.release();
        return result.affectedRows > 0;
    }

}

export default Image;