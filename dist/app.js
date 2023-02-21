"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoDb_1 = __importDefault(require("./config/mongoDb"));
dotenv_1.default.config();
(0, mongoDb_1.default)();
const app = (0, express_1.default)();
app.get('/', (_req, res) => {
    res.json({ message: 'Hello World' });
});
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
