import express from 'express';
import { signup, login, logout } from '../controllers/authController.js';

const authRoute = express.Router();

authRoute.post('/signup', signup);
authRoute.post('/login', login);
authRoute.get('/logout', logout);

export default authRoute;
