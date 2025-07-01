// Function to format the time of the date in a hh:mm format
export const formatTime = (date) => {
    // Get the hours
    let hours = date.getHours().toString();

    // Get the minutes
    let minutes = date.getMinutes().toString();

    // Add a zero at the beginning of the hours if its a 1 digit hour
    if (hours.length === 1) hours = `0${hours}`;

    // Add a zero at the beginning of the minutes if its a 1 digit minute
    if (minutes.length === 1) minutes = `0${minutes}`;

    // Return the formatted time as a string
    return `${hours}:${minutes}`;
};

// Function to format the date in a yyyy-mm-dd format
export const formatDate = (date) => {
    // Get the year
    const year = date.getFullYear();

    // Get the month
    let month = (date.getMonth() + 1).toString(); // 1 because months start from 0 in javascript date object

    // Get the day of the month
    let day = date.getDate().toString();

    // Add a zero at the beginning of the month if its a 1 digit month
    if (month.length === 1) month = `0${month}`;

    // Add a zero at the beginning of the day if its 1 digit
    if (day.length === 1) day = `0${day}`;

    // Return the formatted date as a string
    return `${year}-${month}-${day}`;
};
