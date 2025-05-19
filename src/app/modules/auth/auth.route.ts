
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

// Login User Route
router.post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginAdmin,
);

// Change user password route
// router.post(
//     '/change-password',
//     auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
//     validateRequest(AuthValidation.changePasswordValidationSchema),
//     AuthControllers.changePassword,
// );


// Refress Token Route
// router.post(
//     '/refresh-token',
//     validateRequest(AuthValidation.refreshTokenValidationSchema),
//     AuthControllers.refreshToken,
// );



export const AuthRoutes = router;