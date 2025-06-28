import express from 'express';
import {
    createLeagueFixtures,
    getAllLeagueFixtures,
    getLeagueFixture,
    updateLeagueFixture,
    deleteLeagueFixture,
    getUpcomingFixtures,
} from '../controllers/fixtureController.js';
import { protect } from '../controllers/authController.js';
import { verifyLeagueCreator } from '../controllers/leagueController.js';

const fixtureRoutes = express.Router();

fixtureRoutes
    .route('/')
    .get(getAllLeagueFixtures)
    .post(protect, verifyLeagueCreator, createLeagueFixtures);

fixtureRoutes.route('/upcoming').get(protect, getUpcomingFixtures);

fixtureRoutes
    .route('/:fixtureId')
    .get(getLeagueFixture)
    .patch(protect, verifyLeagueCreator, updateLeagueFixture)
    .delete(protect, verifyLeagueCreator, deleteLeagueFixture);

export default fixtureRoutes;
