import { Schema, model } from 'mongoose';

const fixtureSchema = new Schema({
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
});

fixtureSchema.virtual('time').get(function () {
    const date = this.date;
    return date === 'TBC' ? 'TBC' : '';
});

const Fixture = model('Fixture', fixtureSchema);

export default Fixture;
