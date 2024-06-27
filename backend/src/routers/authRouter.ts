import { Router } from 'express';
import { register, login, getAllUsers, deleteUser } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

export default router;
