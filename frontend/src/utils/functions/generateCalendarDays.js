export const generateCalendarDays = (month) => {
    // Get current year
    const currentDate = Date.now();
    const currentYear = new Date(currentDate).getFullYear();

    const days = []; // Holds the days

    // Add the last few days of the previous month
    const firstDay = new Date(currentYear, month, 1).getDay(); // First day of the current month
    const previousMonthDay = new Date(currentYear, month, 0).getDate(); // Last day of the previous month

    for (let i = firstDay - 1; i >= 0; i--) {
        const dayValue = previousMonthDay - i;
        days.push({ type: 'inactive', value: `${dayValue}` });
    }

    // Add the days of the month
    const lastDayValue = new Date(currentYear, month + 1, 0).getDate(); // The value of the last day
    const currentDayValue = new Date(currentDate).getDate(); // The value of the current day
    const currentMonth = new Date(currentDate).getMonth();
    for (let i = 1; i <= lastDayValue; i++) {
        // Disable the days that are before the current day
        if (i < currentDayValue && month === currentMonth) {
            days.push({ type: 'inactive', value: `${i}` });
            continue;
        }

        days.push({ value: `${i}` });
    }

    // Add the first few days of the next month
    const lastDay = new Date(currentYear, month, lastDayValue).getDay();
    for (let i = 1; i < 7 - lastDay; i++) {
        days.push({ type: 'inactive', value: `${i}` });
    }

    return days;
};

export const addFixtures = (fixtures, days, month) => {
    const updatedDays = days.map((day) => {
        let updatedDay = { fixtures: [], ...day };
        fixtures.forEach((fixture) => {
            if (fixture.date && day.type !== 'inactive') {
                const fixtureDay = new Date(fixture.date).getDate();
                const fixtureMonth = new Date(fixture.date).getMonth();
                const convertedValue = parseInt(updatedDay.value);
                if (fixtureDay === convertedValue && month === fixtureMonth) {
                    updatedDay.fixtures.push(fixture);
                }
            }
        });
        return updatedDay;
    });

    return updatedDays;
};
