
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    password: string;
    role: 'admin';
};



export interface UserModel extends Model<TUser> {

    //instance methods for checking if the user exist
    isUserExistId(id: string): Promise<TUser>;

    //instance methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;

    // Password Chenged then token expire
    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number,
    ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;