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
    const { homeTeam, awayTeam, date } = fixture;
    const leagueId = fixture.league;

    // create and save the result
    const result = await Result.create({
        league: leagueId,
        homeTeam,
        awayTeam,
        date,
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

export const updateFixtureResult = asyncHandler(async (req, res, next) => {
    if (!req.params || !req.params.resultId) {
        const error = new AppError(
            400,
            'Result ID required! Please provide a result ID.'
        );
        return next(error);
    }

    if (!req.body) {
        const error = new AppError(
            400,
            'Fields required! Please provide a fixture results'
        );
        return next(error);
    }

    // for this to work we need to always send both the home and away team scores
    const { homeTeamScore, awayTeamScore } = req.body; // new scores

    // check if the result exist and get the old result
    const oldResult = await Result.findById(req.params.resultId);
    if (!oldResult) {
        const error = new AppError(
            400,
            'Result not found! Please check your result ID and try again.'
        );
        return next(error);
    }

    const { homeTeamScore: oldHomeScore, awayTeamScore: oldAwayScore } =
        oldResult; // old scores

    // get the difference in goals
    const homeDifference = oldHomeScore - homeTeamScore;
    const awayDifference = oldAwayScore - awayTeamScore;

    // determine the new scores result (check which team won or if it was a draw)
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

    const leagueId = req.league._id; // the league data will be available from the verify league creator middleware
    const homeTeam = oldResult.homeTeam;
    const awayTeam = oldResult.awayTeam;

    // update home team league details
    const homeTeamFields = {}; // fields to increment
    // determine home team old result and decrement the field
    if (oldHomeScore > oldAwayScore && homeTeamResult !== 'wins') {
        homeTeamFields['teams.$.wins'] = -1;
        homeTeamFields[`teams.$.${homeTeamResult}`] = 1;
    } else if (oldHomeScore < oldAwayScore && homeTeamResult !== 'loses') {
        homeTeamFields['teams.$.loses'] = -1;
        homeTeamFields[`teams.$.${homeTeamResult}`] = 1;
    } else if (oldHomeScore === oldAwayScore && homeTeamResult !== 'draws') {
        homeTeamFields['teams.$.draws'] = -1;
        homeTeamFields[`teams.$.${homeTeamResult}`] = 1;
    }

    homeTeamFields[`teams.$.goalsFoward`] = -homeDifference;
    homeTeamFields[`teams.$.goalsAgainst`] = -awayDifference;

    const homeTeamQuery = League.updateOne(
        {
            _id: leagueId,
            teams: { $elemMatch: { _id: homeTeam } },
        },
        {
            $inc: homeTeamFields,
        }
    );

    // update awayt team league details
    // update home team league details
    const awayTeamFields = {}; // fields to increment
    // determine home team old result and decrement the field
    if (oldAwayScore > oldHomeScore && awayTeamResult !== 'wins') {
        awayTeamFields['teams.$.wins'] = -1;
        awayTeamFields[`teams.$.${awayTeamResult}`] = 1;
    } else if (oldAwayScore < oldHomeScore && awayTeamResult !== 'loses') {
        awayTeamFields['teams.$.loses'] = -1;
        awayTeamFields[`teams.$.${awayTeamResult}`] = 1;
    } else if (oldAwayScore === oldHomeScore && awayTeamResult !== 'draws') {
        awayTeamFields['teams.$.draws'] = -1;
        awayTeamFields[`teams.$.${awayTeamResult}`] = 1;
    }

    awayTeamFields[`teams.$.goalsFoward`] = -awayDifference;
    awayTeamFields[`teams.$.goalsAgainst`] = -homeDifference;

    const awayTeamQuery = League.updateOne(
        {
            _id: leagueId,
            teams: { $elemMatch: { _id: awayTeam } },
        },
        {
            $inc: awayTeamFields,
        }
    );

    // update the result
    const resultQuery = Result.findByIdAndUpdate(
        req.params.resultId,
        {
            homeTeamScore,
            awayTeamScore,
        },
        { new: true }
    );

    const [homeTeamResults, awayTeamResults, result] = await Promise.all([
        homeTeamQuery,
        awayTeamQuery,
        resultQuery,
    ]);

    if (!homeTeamResults.acknowledged || !awayTeamResults.acknowledged) {
        const error = new AppError(
            500,
            'Could not update result! Please try again later'
        );
        return next(error);
    }

    res.status(200).json({ result });
});
