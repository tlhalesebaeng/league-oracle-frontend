import express from 'express';
import { protect } from '../controllers/authController.js';
import { verifyLeagueCreator } from '../controllers/leagueController.js';
import {
    addTeam,
    updateTeam,
    deleteTeam,
} from '../controllers/teamController.js';

const teamRoutes = express.Router({ mergeParams: true }); // mergeParams allows us to merge parent params (leagueId in this case)

teamRoutes.route('/', protect, verifyLeagueCreator).post(addTeam);
teamRoutes
    .route('/:teamId', protect, verifyLeagueCreator)
    .patch(updateTeam)
    .delete(deleteTeam);

export default teamRoutes;
