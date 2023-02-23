import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { Schema } from 'joi';

const validate = (validator: Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = await validator.validateAsync(req.body);
            req.body = validated;
            next();
        } catch (error: any) {
            next(createHttpError.UnprocessableEntity(error.message));
        }
    };
};

export default validate;
