import AppError from '../AppError.js';
import League from '../models/leagueModel.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createLeague = asyncHandler(async (req, res, next) => {
    if (!req.body || !req.body.teams || req.body.teams.length < 2) {
        const error = new AppError(
            400,
            'A league should have at least two teams.'
        );
        return next(error);
    }

    const league = await League.create({
        name: req.body.name,
        creator: req.user._id,
        teams: req.body.teams,
    });

    const leagueData = {
        name: league.name,
        creator: req.user,
        teams: league.teams,
        _id: league._id,
    };

    res.status(201).json({ league: leagueData });
});

export const getAllLeagues = asyncHandler(async (req, res, next) => {
    const queryObj = {};
    const name = req.query.name;
    if (name) {
        // find league names that have this provided name field as part of their name
        queryObj['name'] = new RegExp(name, 'i'); // i makes this regex case-insensitive
    }
    const leagues = await League.find(queryObj);
    res.status(200).json({ leagues });
});

export const getLeague = asyncHandler(async (req, res, next) => {
    if (!req.params || !req.params.leagueId) {
        const error = new AppError(
            400,
            'League ID required! Please provide a league ID.'
        );
        return next(error);
    }

    const league = await League.findById(req.params.leagueId);
    if (!league) {
        const error = new AppError(
            404,
            'League not found! Please check league ID and try again.'
        );
        return next(error);
    }

    res.status(200).json({ league });
});

export const getMyLeagues = asyncHandler(async (req, res, next) => {
    const leagues = await League.find({ creator: req.user._id });
    if (!leagues) {
        const error = new AppError(400, 'No leagues found!');
        return next(error);
    }

    res.status(200).json({ leagues });
});

export const verifyLeagueCreator = asyncHandler(async (req, res, next) => {
    let leagueId = '';
    if (req.params || req.query) {
        leagueId = req.params.leagueId || req.query.leagueId;
    } else {
        const error = new AppError(
            400,
            'League ID required! Please provide a league ID.'
        );
        return next(error);
    }

    const league = await League.findById(leagueId);
    if (!league) {
        const error = new AppError(
            400,
            'League not found! Please check league ID and try again.'
        );
        return next(error);
    }

    const isCreator = league.creator.equals(req.user._id);
    if (!isCreator) {
        const error = new AppError(
            401,
            'Only the league creator is allowed to update this league.'
        );
        return next(error);
    }

    req.league = league;

    next();
});

export const updateLeague = asyncHandler(async (req, res, next) => {
    if (!req.body || !req.body.name) {
        const error = new AppError(
            400,
            'No field to update! Please provide a field to update'
        );

        return next(error);
    }

    const { name } = req.body;

    const league = await League.findByIdAndUpdate(req.params.leagueId, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({ league });
});

export const deleteLeague = asyncHandler(async (req, res, next) => {
    await League.findByIdAndDelete(req.params.leagueId);

    res.status(204).json(null);
});
