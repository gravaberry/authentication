import express from 'express';

import {
    getProducts,
    getProductsByID,
    createProduct,
    deleteProduct,
    updateProducts,
} from '../controller/Products.js';

import { verifyUser } from '../middleware/AuthUser.js';
const router = express.Router();


router.get('/products', verifyUser,getProducts);
router.get('/products/:id',verifyUser, getProductsByID);
router.post('/products',verifyUser, createProduct);
router.patch('/products/:id',verifyUser, updateProducts );
router.delete('/products/:id',verifyUser, deleteProduct);


export default router;