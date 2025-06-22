import mongoose from 'mongoose';

// function to connect our app to the database
const connectDB = async () => {
    try {
        const db = process.env.DATABASE_URI;
        const connection = await mongoose.connect(db);
        if (connection) {
            console.log('Database connection successful...');
        }
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
