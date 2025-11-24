import { useEffect, useState } from 'react';

import { useFetch } from '../../../../hooks/useFetch.js';
import {
    addFixtures,
    generateCalendarDays,
} from '../../../../utils/generateCalendarDays.js';

import QuickActions from '../quick-actions/QuickActions.jsx';
import UpcomingFixtures from '../upcoming-fixtures/UpcomingFixtures.jsx';
import FixtureItem from '../../../../components/fixture/fixture-item/FixtureItem.jsx';
import './Dashboard.css';

const Dashboard = ({ user }) => {
    const [days, setDays] = useState([]);
    const [shownFixture, setShownFixtures] = useState([]);
    const [fixturesDate, setFixturesDate] = useState('');
    const { request, isLoading, error } = useFetch();

    // Get the current date
    const currentDate = new Date();

    // Get the current month
    const currentMonth = currentDate.getMonth();

    useEffect(() => {
        // Derive the days of the current month
        const currentMonthDays = generateCalendarDays(currentMonth);

        // Get the fixtures of the current month
        const updateDays = async () => {
            const fixtures = await request(
                `/fixtures/upcoming?month=${currentMonth + 1}`,
                'get'
            );

            if (fixtures.data) {
                const upcomingFixtures = fixtures.data;

                const updatedMonthDays = addFixtures(
                    upcomingFixtures,
                    currentMonthDays,
                    currentMonth
                );
                // Set the days to be the current month days
                setDays(updatedMonthDays);
            }
        };

        updateDays();
    }, []);

    const handleSelectMonth = async (value, index) => {
        // Derive days of the selected months
        const selectedMonthDays = generateCalendarDays(index);

        const fixtures = await request(
            `/fixtures/upcoming?month=${index + 1}`,
            'get'
        );

        if (fixtures.data) {
            const upcomingFixtures = fixtures.data;

            const updatedMonthDays = addFixtures(
                upcomingFixtures,
                selectedMonthDays,
                index
            );
            // Set the days to be the selected month days
            setDays(updatedMonthDays);
        }

        setShownFixtures([]);
        setFixturesDate('');
    };

    const handleDayClick = async (fixtures) => {
        setShownFixtures([...fixtures]);

        const fixtureDate = new Date(fixtures[0].date);
        const dateOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        setFixturesDate(fixtureDate.toLocaleDateString(undefined, dateOptions));
    };

    const hasFixtures = shownFixture.length !== 0;

    return (
        <div className="dashboard">
            <section className="dashboard-message">
                <h2>
                    Welcome, {user.firstName} {user.lastName}
                </h2>
                <p>We are pleased to see you using League Oracle once again</p>
            </section>
            <section className="dashboard-details">
                <section className="dashboard-details__main">
                    <QuickActions />
                    <UpcomingFixtures
                        onSelectMonth={handleSelectMonth}
                        onDayClick={handleDayClick}
                        loading={isLoading}
                        error={error}
                        days={days}
                    />
                </section>
                {hasFixtures && (
                    <section className="dashboard-details__fixtures">
                        <h3>Scheduled Fixtures For</h3>
                        <p className="dashboard-details__fixtures-date">
                            {fixturesDate}
                        </p>
                        <ul>
                            {shownFixture.map((fixture) => (
                                <FixtureItem
                                    leagueId={fixture.league}
                                    key={fixture.id}
                                    fixture={fixture}
                                />
                            ))}
                        </ul>
                    </section>
                )}
            </section>
        </div>
    );
};

export default Dashboard;
