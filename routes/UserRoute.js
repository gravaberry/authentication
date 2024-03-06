import express from 'express';

import {
    getUsers,
    getUsersByID,
    createUser,
    updateUsers,
    deleteUser
} from '../controller/Users.js';
import { verifyUser, adminOnly } from '../middleware/AuthUser.js';
const router = express.Router();

router.get('/users',verifyUser,adminOnly,  getUsers);
router.get('/users/:id',verifyUser,adminOnly, getUsersByID);
router.post('/users', verifyUser,adminOnly, createUser);
router.patch('/users/:id',verifyUser,adminOnly, updateUsers);
router.delete('/users/:id',verifyUser,adminOnly, deleteUser);

export default router;