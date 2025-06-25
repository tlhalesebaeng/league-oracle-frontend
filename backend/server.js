import app from './src/app.js';
import connectDB from './src/utils/connectDB.js';

// Get the port
const PORT = process.env.PORT;

// Get the server environment
const SERVER_ENV = process.env.SERVER_ENV;

// Start the server
const server = app.listen(PORT, () => {
    // Log to the console to show that we have connected successfully
    console.log(`Listening on port ${PORT}...`);

    // Connect the app to the database
    connectDB();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    if (SERVER_ENV !== 'production') {
        // Log the error to the console
        console.log('ERROR:', error.name, error.message);
    }

    server.close(() => {
        console.log('Shutting down the server...');
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    if (SERVER_ENV !== 'production') {
        // Log the error to the console
        console.log('ERROR:', error.name, error.message);
    }

    server.close(() => {
        console.log('Shutting down the server...');
        process.exit(1);
    });
});
