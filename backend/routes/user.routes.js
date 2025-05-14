import express from 'express';
import { getUsers, Login, Signup } from '../controller/user.controller.js';

const router = express.Router();

router.post('/signup',Signup)
router.post('/login',Login)
router.get('/users',getUsers)

export default router;