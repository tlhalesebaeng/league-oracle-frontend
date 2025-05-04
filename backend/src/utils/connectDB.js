import mongoose from 'mongoose';

// function to connect our app to the database
const connectDB = async () => {
    try {
        const db = process.env.DATABASE_URI;
        const finalDB = db.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
        const connection = await mongoose.connect(finalDB);
        if (connection) {
            console.log('Database connection successful...');
        }
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
