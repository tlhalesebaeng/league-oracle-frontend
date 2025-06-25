import mongoose from 'mongoose';

// function to connect our app to the database
const connectDB = async () => {
    try {
        const db = process.env.DATABASE_URI;
        const connection = await mongoose.connect(db);
        if (connection) {
            console.log('Database connection successful...');
        } else {
            console.log('Database connection failed!!!');
        }
    } catch (error) {
        // Get the server environment
        const SERVER_ENV = process.env.SERVER_ENV;
        if (SERVER_ENV === 'development') {
            console.log(error);
        }

        console.log('Database connection failed!!!');
    }
};

export default connectDB;
