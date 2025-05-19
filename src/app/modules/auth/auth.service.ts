import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import { createToken } from "./auth.utils";
import config from "../../config";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcrypt';



// LogIn User Function
const loginAdminIntoDB = async (payload: TLoginUser) => {


    // Check User exixtse
    const user = await User.isUserExistId(payload.email);

    // console.log(isUserExists);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user email is not found !');
    }


    //checking if the password is correct
    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');


    const jwtPayload = {
        email: user.email,
        name: user.name,
        image: user.image,
        phoneNumber: user.phoneNumber,
        address: user.address,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );


    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string,
    );


    return {
        accessToken,
        refreshToken,
    };

};


// Change Password of user
const changePasswordIntoDB = async (
    userData: JwtPayload,
    payload: { oldPassword: string; newPassword: string },
) => {
    // checking if the user is exist
    const user = await User.isUserExistId(userData.email);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }


    //checking if the password is correct

    if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    //hash new password
    const newHashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.bcrypt_salt_rounds),
    );

    await User.findOneAndUpdate(
        {
            email: userData.email,
            role: userData.role,
        },
        {
            password: newHashedPassword,
        },
    );

    return null;
};


const refreshTokenIntoDB = async (token: string) => {
    // checking if the given token is valid
    const decoded = jwt.verify(
        token,
        config.jwt_refresh_secret as string,
    ) as JwtPayload;

    const { email } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistId(email);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }


    const jwtPayload = {
        email: user.email,
        name: user.name,
        image: user.image,
        phoneNumber: user.phoneNumber,
        address: user.address,
        role: user.role,
    };


    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    return {
        accessToken,
    };
};



export const AuthServices = {
    loginAdminIntoDB,
    changePasswordIntoDB,
    refreshTokenIntoDB,
};