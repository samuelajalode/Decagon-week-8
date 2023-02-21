"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDatabase = async () => {
    try {
        const MONGO_URL = process.env.MONGO_URL;
        mongoose_1.default.connect(MONGO_URL);
        const conn = mongoose_1.default.connection;
        conn.once('open', () => {
            console.log('MongoDB connection established successfully');
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.default = connectDatabase;
