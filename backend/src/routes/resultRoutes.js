import express from 'express';
import {
    addFixtureResult,
    getAllFixtureResults,
    getFixtureResult,
    updateFixtureResult,
} from '../controllers/resultController.js';
import { protect } from '../controllers/authController.js';
import { verifyLeagueCreator } from '../controllers/leagueController.js';
const resultRoute = express.Router();

resultRoute
    .route('/')
    .post(protect, verifyLeagueCreator, addFixtureResult)
    .get(getAllFixtureResults);

resultRoute
    .route('/:resultId')
    .patch(protect, verifyLeagueCreator, updateFixtureResult)
    .get(getFixtureResult);

export default resultRoute;
