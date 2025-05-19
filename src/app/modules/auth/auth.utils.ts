

import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export const createToken = (
    jwtPayload: {
        email: string;
        name: string;
        image: string;
        phoneNumber: string;
        address: string;
        role: string;
    },
    secret: string,
    expiresIn: string,
) => {
    const options: SignOptions = {
        expiresIn: expiresIn as unknown as number | undefined,
    };
    return jwt.sign(jwtPayload, secret, options);
};


// Veryfy token
export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload;
};