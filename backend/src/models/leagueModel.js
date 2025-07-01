import { Schema, model } from 'mongoose';
import teamSchema from './teamModel.js';
import AppError from '../AppError.js';

const leagueSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name required! Please provide a league name.'],
            unique: true,
        },
        creator: {
            type: Schema.ObjectId,
            ref: 'User',
            required: [
                true,
                'Creator required! Please provide a league creator ',
            ],
        },
        teams: [teamSchema],
    },
    { timestamps: true }
);

// ensure that teams have unique name within a league
leagueSchema.pre('save', function (next) {
    const uniqueTeams = {};
    this.teams.forEach((team) => {
        if (uniqueTeams[team.name]) {
            const error = new AppError(
                400,
                'Teams should have different names.'
            );
            return next(error);
        }
        uniqueTeams[team.name] = true;
    });
    next();
});

const League = model('League', leagueSchema);

export default League;
