import express from 'express';
import { getAllUsers, getUserById, createUser, deleteUserById, updateUserById, loginUser, logoutUser} from './../controllers/users.js';

const router = express.Router()


// Get all users
router.get('/', getAllUsers);

// Get specific user
router.get('/:id', getUserById);

// Create user
router.post('/', createUser);

// Update User
router.put('/:id', updateUserById);

// Delete User
router.delete('/:id', deleteUserById);


router.post('/login', loginUser);


router.post('/logout', logoutUser);


export default router;