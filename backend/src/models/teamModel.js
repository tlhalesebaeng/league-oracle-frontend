import { Schema } from 'mongoose';

const teamSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name required! Please provide a team name.'],
        },
        wins: {
            type: Number,
            default: 0,
        },
        draws: {
            type: Number,
            default: 0,
        },
        loses: {
            type: Number,
            default: 0,
        },
        goalsFoward: {
            type: Number,
            default: 0,
        },
        goalsAgainst: {
            type: Number,
            default: 0,
        },
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

teamSchema.virtual('playedGames').get(function () {
    const { wins, draws, loses } = this;
    return wins + draws + loses;
});

teamSchema.virtual('points').get(function () {
    const { wins, draws } = this;
    return wins * 3 + draws;
});

teamSchema.virtual('goalDifference').get(function () {
    const { goalsFoward, goalsAgainst } = this;
    return goalsFoward - goalsAgainst;
});

export default teamSchema;
