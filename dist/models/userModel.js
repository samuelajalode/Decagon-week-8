"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.UserSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User',
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        allowNull: true,
    },
    lastname: {
        type: String,
        allowNull: true,
    },
    salt: {
        type: String,
        allowNull: true,
    },
    address: {
        type: String,
        allowNull: true,
    },
    phone: {
        type: String,
        allowNull: false,
        unique: true,
        notNull: { msg: "Phone number is required" },
        notEmpty: { msg: "Phone number is required" }
    },
    otp: {
        type: Number,
        required: true,
        allowNull: false,
        notNull: { msg: "OTP is required" },
        notEmpty: { msg: "ptovide an OTP" }
    },
    otp_expiry: {
        type: Date,
        allowNull: false,
        notNull: { msg: "OTP expired" }
    },
    lng: {
        type: Number,
        allowNull: true,
    },
    lat: {
        type: Number,
        allowNull: true,
    },
    verified: {
        type: Boolean,
        default: false,
        allowNull: false,
        notNull: { msg: "Verification status is required" },
    },
    role: {
        type: String,
        allowNull: true,
    }
}, {
    timestamps: true,
});
// login user //
exports.UserSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt_1.default.compare(enterPassword, this.password);
};
// Register //
exports.UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt_1.default.genSalt(10);
    this.password = await bcrypt_1.default.hash(this.password, salt);
});
const User = mongoose_1.default.model('User', exports.UserSchema);
exports.default = User;
