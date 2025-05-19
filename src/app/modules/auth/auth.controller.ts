// import config from "../../config";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import httpStatus from "http-status";


// user Login 
const loginAdmin = catchAsync(async (req, res) => {

    const result = await AuthServices.loginAdminIntoDB(req.body);
    const { refreshToken, accessToken, } = result;
    // const { accessToken, } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'production',
        httpOnly: true,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is logged in succesfully!',
        data: {
            accessToken,
            refreshToken
        },
    });
});

// Password Chenge user
// const changePassword = catchAsync(async (req, res) => {
//     const { ...passwordData } = req.body;
//     // console.log(req.user, req.body);

//     const result = await AuthServices.changePassword(req.user, passwordData);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Password is updated succesfully!',
//         data: result,
//     });
// });

// Refress Token
const refreshToken = catchAsync(async (req, res) => {

    const { refreshToken } = req.cookies;
    
    const result = await AuthServices.refreshTokenIntoDB(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Access token is retrieved succesfully!',
        data: result,
    });
});


export const AuthControllers = {
    loginAdmin,
    // changePassword,
    refreshToken,
};