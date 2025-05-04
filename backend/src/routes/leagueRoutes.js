import express from 'express';
import { protect } from '../controllers/authController.js';
import {
    createLeague,
    deleteLeague,
    getAllLeagues,
    getLeague,
    getMyLeagues,
    updateLeague,
    verifyLeagueCreator,
} from '../controllers/leagueController.js';

const leagueRoutes = express.Router();

leagueRoutes.route('/').post(protect, createLeague).get(getAllLeagues);
leagueRoutes.route('/mine').get(protect, getMyLeagues);
leagueRoutes
    .route('/:leagueId')
    .get(getLeague)
    .patch(protect, verifyLeagueCreator, updateLeague)
    .delete(protect, verifyLeagueCreator, deleteLeague);

export default leagueRoutes;
