import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDatabase = () : void =>{
    const dbUri =  process.env.MONGODB_URI;

    mongoose.connect(dbUri!)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Stop the app if unable to connect to the database
    });
}; 
