




import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schma: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validation check
            await schma.parseAsync({
                body: req.body,
            });
            next();
        } catch (err) {
            next(err);
        }
    };
};

export default validateRequest;