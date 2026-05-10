import express from 'express';
import {createUser, getUsers, getUserById, updateUser} from '../controllers/userController.js';

const router = express.Router();

router.post('/create', createUser);
router.get ('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);

export default router;