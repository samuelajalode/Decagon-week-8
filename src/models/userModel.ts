


import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
export interface UserAttributes {
    userId:mongoose.Schema.Types.ObjectId;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    salt: string;
    address: string;
    phone: string;
    otp: number;
    otp_expiry: Date;
    lng: number;
    lat: number;
    verified: boolean;
    role:string;
}
export const UserSchema = new mongoose.Schema<UserAttributes>(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref:'User',
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password:{
            type:String,
            required: true,
        },
        firstname: {
            type: String,
            allowNull:true,
        },
        lastname: {
            type: String,
            allowNull:true,
        },
        salt:{
            type: String,
            allowNull:true,
        },
        address: {
            type: String,
            allowNull:true,
        },
        phone:{
            type: String,
            allowNull: false,
            unique: true,
            notNull: {msg: "Phone number is required"},
            notEmpty: {msg: "Phone number is required"}
        },
        otp:{
            type: Number,
            required: true,
            allowNull:false,
            notNull: {msg: "OTP is required"},
            notEmpty: {msg: "ptovide an OTP"}
        },
        otp_expiry:{
            type: Date,
            allowNull: false,
            notNull: {msg: "OTP expired"}
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
            notNull: {msg: "Verification status is required"},
        },
        role: {
            type: String,
            allowNull: true,
        }
    },
    {
        timestamps: true,
    }
);
// login user //
UserSchema.methods.matchPassword = async function (enterPassword: string | Buffer){
 return await bcrypt.compare(enterPassword, this.password);
};
// Register //
UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model('User', UserSchema);
export default User;