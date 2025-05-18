

import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser, UserModel } from './user.interface';


const userSchema = new Schema<TUser>(
    {
        id: {
            type: String,
            required: [true, 'user id is required'],
            unique: true,
        },
        name: {
            type: String,
            required: [true, 'User name is requered'],
            trim: true,
            maxlength: [100, 'Name can not be more than 20 characters'],
        },
        email: {
            type: String,
            required: [true, 'user Email is required'],
            unique: true,
            trim: true
        },
        phoneNumber: {
            type: String,
            required: [true, 'user phoneNumber is requered'],
            trim: true
        },
        address: {
            type: String,
            default: '',
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password id is required'],
            select: 0
        },
        role: {
            type: String,
            enum: ['admin'],
        },

    },
    {
        timestamps: true,
        versionKey: false
    },
);

userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

// Existing ID
userSchema.statics.isUserExistId = async function (id: string) {
    return await User.findOne({ id }).select('+password');
};

// Password Matched
userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Chenged password then tokn expired
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
) {
    const passwordChangedTime =
        new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);