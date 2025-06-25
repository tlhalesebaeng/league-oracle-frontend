import app from './src/app.js';
import connectDB from './src/utils/connectDB.js';

// Get the port
const PORT = process.env.PORT;

// Start the server
app.listen(PORT, () => {
    // Log to the console to show that we have connected successfully
    console.log(`Listening on port ${PORT}...`);

    // Connect the app to the database
    connectDB();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    // Log the error to the console
    console.log('ERROR:', error.name, error.message);
});
