import express from 'express';
import {
    signup,
    login,
    logout,
    checkAuth,
    checkHealthStatus
} from '../controllers/authController.js';

const authRoute = express.Router();

authRoute.post('/signup', signup);
authRoute.post('/login', login);
authRoute.get('/logout', logout);
authRoute.get('/check', checkAuth);
authRoute.get('/health', checkHealthStatus); // used in production to check if our backend is up and running (healthy)

export default authRoute;
