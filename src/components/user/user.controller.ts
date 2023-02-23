import { NextFunction, Request, Response } from 'express';
import userService from './user.service';
import HttpResponse from '../../helper/response';
import createHttpError from 'http-errors';
import comparePassword, { } from '../../helper/bcrypt';

export default {
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const doesExist = await userService.findOne({ email: req.body.email });
            if (!doesExist) throw createHttpError.BadRequest('Email or password is incorrect');

            const isCorrectPassword = await comparePassword(req.body.password, doesExist.password);
            if (!isCorrectPassword) throw createHttpError.BadRequest('Email or password is incorrect');

            HttpResponse(res, { code: 200, message: 'Login successfully!', data: doesExist });
        } catch (error) {
            next(error);
        }
    },
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const doesExist = await userService.findOne({ email: req.body.email });

            // Should send email to user instead of returning conflict code.
            // Hackers can use this to brute force user's account
            if (doesExist) throw createHttpError.Conflict('Email already in use');

            const userCreated = await userService.create(req.body);
            HttpResponse(res, { code: 200, message: 'Registered successfully!', data: userCreated });
        } catch (error) {
            next(error);
        }
    },
    logout: async (req: Request, res: Response, next: NextFunction) => {

    },
    refreshToken: async (req: Request, res: Response, next: NextFunction) => {

    },
};
