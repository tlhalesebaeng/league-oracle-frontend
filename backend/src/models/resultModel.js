import { Schema, model } from 'mongoose';

const resultSchema = new Schema(
    {
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
        date: {
            type: Date,
        },
        homeTeamScore: {
            type: Number,
            default: 0,
        },
        awayTeamScore: {
            type: Number,
            default: 0,
        },
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

resultSchema.virtual('formattedDate').get(function () {
    const date = this.date;
    if (date) {
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString(); // 1 because months start from 0 in javascript date object
        let day = date.getDate().toString();

        if (month.length === 1) {
            month = `0${month}`;
        }

        if (day.length === 1) {
            day = `0${day}`;
        }

        return `${year}-${month}-${day}`;
    }

    return 'TBC';
});

const Result = model('Result', resultSchema);

export default Result;
