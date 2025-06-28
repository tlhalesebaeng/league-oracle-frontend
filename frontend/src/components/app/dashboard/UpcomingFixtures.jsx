import Card from '../Card.jsx';
import DropDown from '../../../utils/DropDown.jsx';
import Spinner from '../Spinner.jsx';
import './UpcomingFixtures.css';

const UpcomingFixtures = (props) => {
    const { onSelectMonth, onDayClick, loading, error, days } = props;

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    // Get the current date
    const currentDate = new Date();

    // Get the current month
    const currentMonth = currentDate.getMonth();

    // Disable the months that are before the current months
    const months = monthNames.map((value, index) => {
        if (index < currentMonth) {
            return { disabled: true, value };
        }

        return { value };
    });

    return (
        <Card className="upcoming-fixtures__card">
            <div className="upcoming-fixtures">
                <section className="upcoming-fixtures__heading">
                    <h3>Upcoming Fixtures</h3>
                    <section>
                        <DropDown
                            defaultValue={monthNames[currentMonth]}
                            options={months}
                            onSelectValue={(value, index) =>
                                onSelectMonth(value, index)
                            }
                        />
                    </section>
                </section>
                {!loading && !error && (
                    <ul className="upcoming-fixtures__calendar">
                        <div className="upcoming-fixtures__calendar-header">
                            {dayNames.map((dayName) => (
                                <li key={dayName}>{dayName}</li>
                            ))}
                        </div>
                        <div className="upcoming-fixtures__calendar-days">
                            {days.map((day) => {
                                // Determine if the day is active
                                const isActive =
                                    day.type === 'inactive' ? true : false;

                                // Derive day class name
                                const stylesClass = isActive
                                    ? day.type
                                    : undefined;

                                // Check if the day has any fixtures scheduled
                                const hasFixtures = day.fixtures.length !== 0;

                                return (
                                    <li
                                        className={stylesClass}
                                        onClick={() => onDayClick(day.fixtures)}
                                    >
                                        <p>{day.value}</p>
                                        {!isActive && hasFixtures && (
                                            <div></div>
                                        )}
                                    </li>
                                );
                            })}
                        </div>
                    </ul>
                )}
            </div>
            <div className="upcoming-fixtures__no-calendar">
                {loading && !error && (
                    <div className="upcoming-fixtures__loading-spinner">
                        <Spinner />
                    </div>
                )}
                {error && !loading && <p className="error-message">{error}</p>}
            </div>
        </Card>
    );
};

export default UpcomingFixtures;
