import mongoose from 'mongoose';

// Function to connect our app to the database
const connectDB = async () => {
    try {
        // Get the databse URI
        const db = process.env.DATABASE_URI;

        // Attempt database connection
        const connection = await mongoose.connect(db);

        // Show that we have connected if the connection was successful
        if (connection) {
            console.log('Database connection successful...');
        } else {
            console.log('Database connection failed!!!');
        }
    } catch (error) {
        // Get the server environment
        const SERVER_ENV = process.env.SERVER_ENV;

        // Log the error to the console under development
        if (SERVER_ENV === 'development') {
            console.log(error);
        }

        // Show that the database connection failed
        console.log('Database connection failed!!!');
    }
};

export default connectDB;
