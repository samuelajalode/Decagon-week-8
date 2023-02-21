import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const connectDatabase = async () => {
    try{
        const MONGO_URL = process.env.MONGO_URL as string;
        mongoose.connect(MONGO_URL);
        const conn = mongoose.connection;
        conn.once('open', () => {
            console.log('MongoDB connection established successfully');
        });
    } catch (err) {
        console.log(err);
    }
};

export default connectDatabase;