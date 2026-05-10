import express from 'express';
import createUser from '../controllers/userController.js'; // Fixed import path

const router = express.Router();

router.post('/', createUser);

export default router;