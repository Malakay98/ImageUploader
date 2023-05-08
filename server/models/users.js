import db from '../database/db.js';

// User model
export const User = {
    // Create a new User
    createUser: async function (username, email, password) {
        const conn = await db.getConnection();
        const [results, fields] = await conn.execute(
            'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())',
            [username, email, password]
        );
        // release() function release the connection back to the pool, making again available for other quotes
        conn.release();
        return results.insertId;
    },

    // Get All Users
    getAll: async function () {
        const conn = await db.getConnection();
        const [results, fields] = await conn.execute('SELECT * FROM users');
        conn.release();
        return results;
    },

    // Get only one user by the id
    getById: async function (id) {
        const conn = await db.getConnection();
        const [results, fields] = await conn.execute(
            'SELECT * FROM users WHERE idusers = ?',
            [id]
        );
        conn.release();
        if (results.length > 0) {
            return results[0]; // Return the user object
        }
        return null; // Return null if user not found
    },

    deleteById: async function (id) {
        const conn = await db.getConnection();
        // THe first argument its a sql statement, the second one is an array that contains the value/s of the parameter/s to be sustituted in place of the ? placeholder in the sql statement
        const [results, fields] = await conn.execute('DELETE FROM users WHERE idusers = ?', [id]);
        conn.release();
        // Return the number of rows that were affected by the SQL query that was executed
        return results.affectedRows > 0;
    },

    // Save user to database
    saveUser: async function (user) {
        const conn = await db.getConnection();
        const [result] = await conn.execute(
            'UPDATE users SET username=?, email=?, password=? WHERE idusers=?',
            [user.username, user.email, user.password, user.idusers]
        );
        conn.release();
        return result.affectedRows > 0;
    },

    // Find user by email
    getByEmail: async function (email) {
        const conn = await db.getConnection();
        const [results, fields] = await conn.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        conn.release();
        if (results.length > 0) {
            return results[0]; // Return the user object
        }
        return null; // Return null if user not found
    },

    findById: async function (id) {
        const conn = await db.getConnection();
        const [rows, fields] = await conn.execute('SELECT * FROM users WHERE idusers = ?', [id]);
        conn.release();
        if (rows.length === 0) {
            return null; // Return null if user not found
        }
        return rows[0]; // Return the user object
    }
};

export default User;