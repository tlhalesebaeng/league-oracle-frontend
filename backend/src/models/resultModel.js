import { Schema, model } from 'mongoose';

const resultSchema = new Schema({
    league: {
        type: Schema.ObjectId,
        ref: 'League',
        required: [
            true,
            'League required! Please provide the league this result belongs to.',
        ],
    },
    homeTeam: {
        type: Schema.ObjectId,
        ref: 'League.teams',
        required: [true, 'Home team required! Please provide a home team.'],
    },
    awayTeam: {
        type: Schema.ObjectId,
        ref: 'League.teams',
        required: [true, 'Away team required! Please provide a home team.'],
    },
    homeTeamScore: {
        type: Number,
        default: 0,
    },
    awayTeamScore: {
        type: Number,
        default: 0,
    },
});

const Result = model('Result', resultSchema);

export default Result;
