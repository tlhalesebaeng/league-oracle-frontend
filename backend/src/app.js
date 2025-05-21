import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AppError from './AppError.js';
import authRoute from './routes/authRoutes.js';
import leagueRoutes from './routes/leagueRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import errorHandler from './controllers/errorController.js';
import fixtureRoutes from './routes/fixtureRoutes.js';
import resultRoute from './routes/resultRoutes.js';

const app = express();

dotenv.config({ path: './config.env' });

if (process.env.SERVER_ENV === 'development') {
    app.use(morgan('dev')); // log some request data (helps to show that request was sent)
}

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/leagues', leagueRoutes);
app.use('/api/v1/leagues/:leagueId/teams', teamRoutes);
app.use('/api/v1/fixtures', fixtureRoutes);
app.use('/api/v1/results', resultRoute);

app.use((req, res, next) => {
    const error = new AppError(404, `${req.originalUrl} not found!`);
    next(error);
});

app.use(errorHandler); // error handling middleware

export default app;

/* TODO:
 * Implement password recovery and add other security mesures
 * Allow other users to invite others to co-handle the league
 * Allow users to update fixture results
 * Delete fixtures and results associated with the league when deleting a league
 */
