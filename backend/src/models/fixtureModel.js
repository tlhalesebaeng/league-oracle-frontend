import { Schema, model } from 'mongoose';
import { formatDate, formatTime } from '../utils/formatData.js';

const fixtureSchema = new Schema(
    {
        league: {
            type: Schema.ObjectId,
            ref: 'League',
            required: [
                true,
                'League required! Please provide the league this fixture belongs to.',
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
        venue: {
            type: String,
            default: 'TBC',
        },
        field: {
            type: String,
            default: 'TBC',
        },
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual property that formats the time of the fixture
fixtureSchema.virtual('time').get(function () {
    const date = this.date;
    if (date) {
        return formatTime(date);
    }

    return 'TBC';
});

// Virtual property that formats the date of the fixture
fixtureSchema.virtual('formattedDate').get(function () {
    const date = this.date;
    if (date) {
        return formatDate(date);
    }

    return 'TBC';
});

const Fixture = model('Fixture', fixtureSchema);

export default Fixture;
