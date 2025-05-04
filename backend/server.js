import app from './src/app.js';
import connectDB from './src/utils/connectDB.js';

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
    connectDB();
});

process.on('unhandledRejection', (error) => {
    console.log('ERROR:', error.name, error.message);
});
