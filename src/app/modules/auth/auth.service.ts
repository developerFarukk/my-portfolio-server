import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import { createToken } from "./auth.utils";
import config from "../../config";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";



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
// const changePasswordIntoDB = async (
//     userData: JwtPayload,
//     payload: { oldPassword: string; newPassword: string },
// ) => {
//     // checking if the user is exist
//     const user = await User.isUserExistsByCustomId(userData.userId);

//     if (!user) {
//         throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
//     }

//     // checking if the user is already deleted
//     const isDeleted = user?.isDeleted;

//     if (isDeleted) {
//         throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
//     }

//     // checking if the user passwordChanged
//     const isneedsPasswordChange = user?.needsPasswordChange;

//     if (!isneedsPasswordChange) {
//         throw new AppError(httpStatus.FORBIDDEN, 'Already password chenged !');
//     }

//     // checking if the user is blocked

//     const userStatus = user?.status;

//     if (userStatus === 'blocked') {
//         throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
//     }

//     //checking if the password is correct

//     if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
//         throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

//     //hash new password
//     const newHashedPassword = await bcrypt.hash(
//         payload.newPassword,
//         Number(config.bcrypt_salt_rounds),
//     );

//     await User.findOneAndUpdate(
//         {
//             id: userData.userId,
//             role: userData.role,
//         },
//         {
//             password: newHashedPassword,
//             needsPasswordChange: false,
//             passwordChangedAt: new Date(),
//         },
//     );

//     return null;
// };


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
    // changePasswordIntoDB,
    refreshTokenIntoDB,
};