


import { z } from 'zod';

// LogIn Validation
const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'email is required.' }),
        password: z.string({ required_error: 'Password is required' }),
    }),
});

// Change Password validation
const changePasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string({
            required_error: 'Old password is required',
        }),
        newPassword: z.string({ required_error: 'Password is required' }),
    }),
});

// Refress Token Validation
const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});



export const AuthValidation = {
    loginValidationSchema,
    changePasswordValidationSchema,
    refreshTokenValidationSchema,
};