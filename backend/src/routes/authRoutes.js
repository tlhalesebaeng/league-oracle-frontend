import express from 'express';
import {
    signup,
    login,
    logout,
    checkAuth,
} from '../controllers/authController.js';

const authRoute = express.Router();

authRoute.post('/signup', signup);
authRoute.post('/login', login);
authRoute.get('/logout', logout);
authRoute.get('/check', checkAuth);

export default authRoute;
