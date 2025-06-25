import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';

import AppError from './AppError.js';
import authRoute from './routes/authRoutes.js';
import leagueRoutes from './routes/leagueRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import errorHandler from './controllers/errorController.js';
import sanitizeInput from './utils/sanitizeInput.js';
import fixtureRoutes from './routes/fixtureRoutes.js';
import resultRoute from './routes/resultRoutes.js';

// Use express to create the server
const app = express();

// Make the environment variables accessible
dotenv.config({ path: './config.env' });

// Log some request data under development (helps to show that request was sent)
if (process.env.SERVER_ENV === 'development') {
    app.use(morgan('dev'));
}

// Set special security headers
app.use(helmet());

// Allow 50 requests in 1 hour to all requests starting with api (rate limiting)
const limiter = rateLimit({
    max: 50,
    windowMs: 60 * 60 * 1000,
    message: {
        message: 'Too many requests, please try again in an hour!',
    },
});
app.use('/api', limiter);

// Configure cors
const frontendBaseUrl = process.env.FRONTEND_BASE_URL;
const corsOptions = { origin: frontendBaseUrl, credentials: true };
app.use(cors(corsOptions));

// Parse the body data into the request body object
// and limit the body payload
app.use(express.json({ limit: '1kb' }));

// Data sanitization (NoSQL query injection)
app.use((req, res, next) => {
    sanitizeInput(req.body);
    sanitizeInput(req.query);
    sanitizeInput(req.params);
    next();
});

// Prevent parameter pollution
app.use(hpp());

// Allow cookies to be sent and received
app.use(cookieParser());

// Compress responses (reduces bandwidth usage)
app.use(compression());

// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/leagues', leagueRoutes);
app.use('/api/v1/leagues/:leagueId/teams', teamRoutes);
app.use('/api/v1/fixtures', fixtureRoutes);
app.use('/api/v1/results', resultRoute);

// Middleware to handle 404 errors
app.use((req, res, next) => {
    // Create the error instance
    const error = new AppError(404, `${req.originalUrl} not found!`);

    // Call the next middleware with the error
    next(error);
});

// Error handling middleware
app.use(errorHandler);

export default app;
