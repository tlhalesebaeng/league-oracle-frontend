import AppError from '../AppError.js';
import Fixture from '../models/fixtureModel.js';
import League from '../models/leagueModel.js';
import Result from '../models/resultModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import replaceTeams from '../utils/replaceTeams.js';

export const addFixtureResult = asyncHandler(async (req, res, next) => {
    if (!req.query || !req.query.fixtureId) {
        const error = new AppError(
            400,
            'Fixture ID required! Please provide a fixture ID'
        );
        return next(error);
    }

    if (!req.body) {
        const error = new AppError(
            400,
            'Fields required! Please provide a fixture results.'
        );
        return next(error);
    }

    const fixture = await Fixture.findById(req.query.fixtureId);
    if (!fixture) {
        const error = new AppError(
            400,
            'Fixture not found! Please check your fixture ID and try again.'
        );
        return next(error);
    }

    const { homeTeamScore, awayTeamScore } = req.body;
    const { homeTeam, awayTeam } = fixture;
    const leagueId = fixture.league;
    const league = req.league;

    // create and save the result
    const result = await Result.create({
        league: leagueId,
        homeTeam,
        awayTeam,
        homeTeamScore,
        awayTeamScore,
    });

    if (!result) {
        const error = new AppError(
            400,
            'Could not create result! Please try again later.'
        );
        return next(error);
    }

    let homeTeamResult = ''; // home team result field to increment based on results
    let awayTeamResult = ''; // away team result field to increment based on results

    if (homeTeamScore > awayTeamScore) {
        homeTeamResult = 'wins';
        awayTeamResult = 'loses';
    } else if (homeTeamScore < awayTeamScore) {
        homeTeamResult = 'loses';
        awayTeamResult = 'wins';
    } else {
        homeTeamResult = 'draws';
        awayTeamResult = 'draws';
    }

    // update home team league details
    const homeTeamFields = {}; // fields to increment
    homeTeamFields[`teams.$.${homeTeamResult}`] = 1;
    homeTeamFields[`teams.$.goalsFoward`] = homeTeamScore;
    homeTeamFields[`teams.$.goalsAgainst`] = awayTeamScore;

    const homeTeamQuery = League.updateOne(
        {
            _id: leagueId,
            teams: { $elemMatch: { _id: homeTeam } },
        },
        {
            $inc: homeTeamFields,
        }
    );

    // update away team league details
    const awayTeamFields = {}; // fields to increment
    awayTeamFields[`teams.$.${awayTeamResult}`] = 1;
    awayTeamFields[`teams.$.goalsFoward`] = awayTeamScore;
    awayTeamFields[`teams.$.goalsAgainst`] = homeTeamScore;

    const awayTeamQuery = League.updateOne(
        {
            _id: leagueId,
            teams: { $elemMatch: { _id: awayTeam } },
        },
        {
            $inc: awayTeamFields,
        }
    );

    const [homeTeamResults, awayTeamResults] = await Promise.all([
        homeTeamQuery,
        awayTeamQuery,
    ]);

    if (!homeTeamResults.acknowledged || !awayTeamResults.acknowledged) {
        const error = new AppError(
            500,
            'Could not update team details! Please try again later.'
        );
        return next(error);
    }

    // delete the fixture
    await Fixture.findByIdAndDelete(fixture._id);

    res.status(201).json({ result });
});

export const getAllFixtureResults = asyncHandler(async (req, res, next) => {
    if (!req.query || !req.query.leagueId) {
        const error = new AppError(
            400,
            'League ID required! Please provide a league ID.'
        );
        return next(error);
    }

    const leagueId = req.query.leagueId;

    const resultsQuery = Result.find({ league: leagueId });
    const leagueQuery = League.findById(leagueId);
    const [dbResults, league] = await Promise.all([resultsQuery, leagueQuery]);

    if (!dbResults || !league) {
        const error = new AppError(
            400,
            'Could not get results! Please try again later.'
        );
        return next(error);
    }

    // replace the teams ids with the actual teams
    const teams = league.teams;
    const results = [];
    dbResults.forEach((dbResult) => {
        const result = { ...dbResult.toObject() };
        replaceTeams(dbResult, teams, result);
        results.push(result);
    });

    res.status(200).json({ name: league.name, results });
});

export const getFixtureResult = asyncHandler(async (req, res, next) => {
    if (!req.params || !req.params.resultId) {
        const error = new AppError(
            400,
            'Result ID required! Please provide a result ID.'
        );
        return next(error);
    }

    if (!req.query || !req.query.leagueId) {
        const error = new AppError(
            400,
            'League ID required! Please provide a league ID.'
        );
        return next(error);
    }

    const resultQuery = Result.findById(req.params.resultId);
    const leagueQuery = League.findById(req.query.leagueId);
    const [dbResult, league] = await Promise.all([resultQuery, leagueQuery]);

    if (!dbResult || !league) {
        const error = new AppError(
            400,
            'Could not get results! Please try again later.'
        );
        return next(error);
    }

    const result = { ...dbResult.toObject() };

    replaceTeams(dbResult, league.teams, result);

    res.status(200).json({ name: league.name, result });
});
