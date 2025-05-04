import League from '../models/leagueModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../AppError.js';

export const addTeam = asyncHandler(async (req, res, next) => {
    if (!req.body) {
        const error = new AppError(
            400,
            'Team required! Please provide a team to add.'
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

    league.teams.push(req.body);

    const newLeague = await league.save();

    res.status(200).json({ league: newLeague });
});

export const updateTeam = asyncHandler(async (req, res, next) => {
    if (!req.params || !req.params.teamId) {
        const error = new AppError(
            400,
            'Team ID required! Please provide a team ID.'
        );
        return next(error);
    }

    // get fields to update
    const fields = {};
    for (const [key, value] of Object.entries(req.body)) {
        if (value) {
            fields[`teams.$.${key}`] = value;
        }
    }

    await League.updateOne(
        {
            _id: req.params.leagueId,
            teams: { $elemMatch: { _id: req.params.teamId } },
        },
        { $set: fields }
    );

    const league = await League.findOne({ _id: req.params.leagueId });

    res.status(200).json({ league });
});

export const deleteTeam = asyncHandler(async (req, res, next) => {
    if (!req.params || !req.params.teamId) {
        const error = new AppError(
            400,
            'Team ID required! Please provide a team ID.'
        );
        return next(error);
    }

    const league = await League.updateOne(
        { _id: req.params.leagueId },
        { $pull: { teams: { _id: req.params.teamId } } }
    );

    if (!league.modifiedCount) {
        const error = new AppError(
            500,
            'Could not delete team! Please try again later.'
        );
        return next(error);
    }

    res.status(204).json(null);
});
