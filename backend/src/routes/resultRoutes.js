import express from 'express';
import {
    addFixtureResult,
    getAllFixtureResults,
    getFixtureResult,
} from '../controllers/resultController.js';
import { protect } from '../controllers/authController.js';
import { verifyLeagueCreator } from '../controllers/leagueController.js';
const resultRoute = express.Router();

resultRoute
    .route('/')
    .post(protect, verifyLeagueCreator, addFixtureResult)
    .get(getAllFixtureResults);

resultRoute.route('/:resultId').get(getFixtureResult);

export default resultRoute;
