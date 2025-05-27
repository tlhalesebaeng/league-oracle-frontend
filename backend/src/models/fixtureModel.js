import { Schema, model } from 'mongoose';

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

fixtureSchema.virtual('time').get(function () {
    const date = this.date;
    if (date) {
        let hours = date.getHours().toString();
        let minutes = date.getMinutes().toString();

        // format the hours and minutes properly
        if (hours.length === 1) {
            hours = `0${hours}`;
        }
        if (minutes.length === 1) {
            minutes = `0${minutes}`;
        }

        return `${hours}:${minutes}`;
    }
    return 'TBC';
});

fixtureSchema.virtual('formattedDate').get(function () {
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

const Fixture = model('Fixture', fixtureSchema);

export default Fixture;
