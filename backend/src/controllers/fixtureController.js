import AppError from '../AppError.js';
import Fixture from '../models/fixtureModel.js';
import League from '../models/leagueModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import replaceTeams from '../utils/replaceTeams.js';

// intermediate function to generate a fixture object between two teams
const genFixture = (teamA, teamB) => {
    // teamA will always be the home team
    return { homeTeam: teamA._id, awayTeam: teamB._id };
};

// function to generate and save fixtures for home and away fixture type
const genHomeAndAway = async (league, next) => {
    try {
        const fixtures = [];
        const teams = league.teams;
        for (let i = 0; i < teams.length; i++) {
            for (let j = 0; j < teams.length; j++) {
                if (i === j) continue;
                const fixture = genFixture(teams[i], teams[j]);
                fixture['league'] = league._id;
                const fixtureQuery = new Fixture(fixture);
                const fixtureCollect = await fixtureQuery.save();
                fixtures.push(fixtureCollect);
            }
        }

        return fixtures;
    } catch (error) {
        next(error);
    }
};

// function to generate and save fixtures for home only fixture type
const genHomeOnly = async (league, next) => {
    try {
        const fixtures = [];
        const teams = league.teams;
        for (let i = 0; i < teams.length - 1; i++) {
            for (let j = i + 1; j < teams.length; j++) {
                const fixture = genFixture(teams[i], teams[j]);
                fixture['league'] = league._id;
                const fixtureQuery = new Fixture(fixture);
                const fixtureCollect = await fixtureQuery.save();
                fixtures.push(fixtureCollect);
            }
        }

        return fixtures;
    } catch (error) {
        next(error);
    }
};

export const createLeagueFixtures = asyncHandler(async (req, res, next) => {
    if (!req.query || !req.query.leagueId) {
        const error = new AppError(
            400,
            'League ID required! Please provide a league ID'
        );
        return next(error);
    }

    if (!req.query.fixtureType) {
        const error = new AppError(
            400,
            'Fixture type required! Please provide a fixture type'
        );
        return next(error);
    }

    // confirm that the fixture type is valid before querying the database
    const fixtureType = req.query.fixtureType;

    if (fixtureType !== 'homeAndAway' && fixtureType !== 'homeOnly') {
        const error = new AppError(
            400,
            'Invalid fixture type! Please provide a valid fixture type'
        );
        return next(error);
    }

    const league = req.league;

    const dbFixtures =
        fixtureType === 'homeAndAway'
            ? await genHomeAndAway(league)
            : await genHomeOnly(league);

    const teams = league.teams;
    const fixtures = [];

    dbFixtures.forEach((dbFixture) => {
        const fixture = { ...dbFixture.toObject() };

        replaceTeams(dbFixture, teams, fixture);

        fixtures.push(fixture);
    });

    res.status(200).json({
        name: league.name,
        _id: league._id,
        fixtures,
    });
});

export const getAllLeagueFixtures = asyncHandler(async (req, res, next) => {
    if (!req.query || !req.query.leagueId) {
        const error = new AppError(
            400,
            'League ID required! Please provide a league ID'
        );
        return next(error);
    }

    const leagueId = req.query.leagueId;

    const fixturesQuery = Fixture.find({ league: leagueId });
    const leagueQuery = League.findById(leagueId);

    const leagueAndFixtures = await Promise.all([fixturesQuery, leagueQuery]);

    const leagueName = leagueAndFixtures[1].name;
    const teams = leagueAndFixtures[1].teams;
    const dbFixtures = leagueAndFixtures[0];

    const fixtures = [];

    dbFixtures.forEach((dbFixture) => {
        const fixture = { ...dbFixture.toObject() };

        replaceTeams(dbFixture, teams, fixture);

        fixtures.push(fixture);
    });

    res.status(200).json({ name: leagueName, fixtures });
});

export const getLeagueFixture = asyncHandler(async (req, res, next) => {
    if (!req.query || !req.query.leagueId) {
        const error = new AppError(
            400,
            'League ID required! Please provide a league ID'
        );
        return next(error);
    }

    if (!req.params || !req.params.fixtureId) {
        const error = new AppError(
            400,
            'Fixture ID required! Please provide a fixture ID'
        );
        return next(error);
    }

    const fixtureId = req.params.fixtureId;
    const leagueId = req.query.leagueId;

    const fixtureQuery = Fixture.findOne({ _id: fixtureId, league: leagueId });
    const leagueQuery = League.findById(leagueId);

    const [league, fixture] = await Promise.all([leagueQuery, fixtureQuery]);

    if (!league) {
        const error = new AppError(
            404,
            'League not found! Please check league ID and try again.'
        );
        return next(error);
    }

    if (!fixture) {
        const error = new AppError(
            404,
            'Fixture not found! Please check fixture ID and try again.'
        );
        return next(error);
    }

    const teams = league.teams;
    const fixtureObj = { ...fixture.toObject() };

    replaceTeams(fixture, teams, fixtureObj);

    res.status(200).json({
        name: league.name,
        creator: league.creator,
        fixture: fixtureObj,
    });
});

export const getUpcomingFixtures = asyncHandler(async (req, res, next) => {
    // Verify that the month is provided
    if (!req.query || !req.query.month) {
        const error = new AppError(
            400,
            'Month required! Please provide a month'
        );
        return next(error);
    }

    // Accept an integer between 0 and 11
    const month = req.query.month;
    const isInteger = !isNaN(Number(month)); // Check if month can be changed to a number
    if (!isInteger || parseInt(month) < 0 || parseInt(month) > 11) {
        const error = new AppError(
            400,
            'Invalid month! Please provide a valid month'
        );
        return next(error);
    }

    // Verify that the month is not in the past
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    if (parseInt(month) < currentMonth) {
        const error = new AppError(
            400,
            'Invalid month! Please provide a future or current month'
        );
        return next(error);
    }

    // Get the fixtures that are scheduled for this month
    // for all the leagues by the logged in user
    const leagues = await League.find({ creator: req.user._id });
    if (!leagues) {
        const error = new AppError(400, 'No leagues found!');
        return next(error);
    }

    const currentYear = currentDate.getFullYear();

    // End of the provided month (one millisecond before the next month starts)
    const startOfNextMonth = new Date(currentYear, parseInt(month) + 1, 1);
    const endOfProvidedMonth = new Date(startOfNextMonth.getTime() - 1);

    const fixturesQueries = []; // Queries for all upcoming fixtures
    leagues.forEach((league) => {
        // Get the fixtures of this league that are in the provided month
        const fixtures = Fixture.find({
            league: league._id,
            date: {
                $gte: currentDate,
                $lt: endOfProvidedMonth,
            },
        });
        fixturesQueries.push(fixtures);
    });

    const fixtures = await Promise.all([...fixturesQueries]);
    const upcomingFixtures = fixtures.flat();

    // Replace the team ids with the team details
    const updatedFixtures = [];
    upcomingFixtures.forEach((upcomingFixture) => {
        leagues.forEach((league) => {
            if (upcomingFixture.league.equals(league._id)) {
                const teams = league.teams;
                const fixture = { ...upcomingFixture.toObject() };

                replaceTeams(upcomingFixture, teams, fixture);

                updatedFixtures.push(fixture);
            }
        });
    });

    res.status(200).json({ fixtures: updatedFixtures });
});

export const updateLeagueFixture = asyncHandler(async (req, res, next) => {
    if (!req.params || !req.params.fixtureId) {
        const error = new AppError(
            400,
            'Fixture ID required! Please provide a fixture ID'
        );
        return next(error);
    }

    if (!req.body) {
        const error = new AppError(
            400,
            'Fields required! Please provide fields to update.'
        );
        return next(error);
    }

    const fixtureId = req.params.fixtureId;
    const { date, time, venue, field } = req.body;

    let changedDate = date;
    if (changedDate) {
        changedDate = new Date(date);
    }

    if (time) {
        const newTime = time.split(':');
        const hours = newTime[0];
        const minutes = newTime[1];

        changedDate.setHours(hours);
        changedDate.setMinutes(minutes);
    }

    const fixture = await Fixture.findByIdAndUpdate(
        fixtureId,
        { date: changedDate, venue, field },
        { new: true }
    );

    if (!fixture) {
        const error = new AppError(
            404,
            'Could not update fixture! Please try again later.'
        );
        return next(error);
    }

    const teams = req.league.teams;
    const fixtureObj = { ...fixture.toObject() };

    replaceTeams(fixture, teams, fixtureObj);

    res.status(200).json({
        name: req.league.name,
        creator: req.league.creator,
        fixture: fixtureObj,
    });
});

export const deleteLeagueFixture = asyncHandler(async (req, res, next) => {
    if (!req.params || !req.params.fixtureId) {
        const error = new AppError(
            400,
            'Fixture ID required! Please provide a fixture ID'
        );
        return next(error);
    }

    await Fixture.findByIdAndDelete(req.params.fixtureId);

    res.status(204).json({});
});
