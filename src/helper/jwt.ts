import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import config from '../config';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import cache from './cache';

interface RequestWithPayload extends Request {
    payload: string | JwtPayload;
}

interface TokenPayload extends JwtPayload {
    sub: string,
}

export default {
    signAccessToken: (payload: TokenPayload): string => {
        return jwt.sign(payload, config.JWT.ACCESS_TOKEN_SECRET, { expiresIn: config.JWT.ACCESS_EXPIRES_IN, subject: payload.sub });
    },

    signRefreshToken: async (payload: TokenPayload): Promise<string> => {
        const refreshToken = jwt.sign(payload, config.JWT.REFRESH_TOKEN_SECRET, { expiresIn: config.JWT.REFRESH_EXPIRES_IN, subject: payload.sub });
        await cache.set(`user:${payload.sub}`, refreshToken, { EX: config.JWT.REFRESH_EXPIRES_IN });
        return refreshToken;
    },

    verifyAccessToken: (req: RequestWithPayload, res: Response, next: NextFunction) => {
        try {
            if (!req.headers.authorization) throw createHttpError.Unauthorized();

            const token = req.headers.authorization.split(' ')[1];
            req.payload = jwt.verify(token, config.JWT.ACCESS_TOKEN_SECRET);
            next();
        } catch (error: any) {
            error.message = error.name === 'JsonWebTokenError' ? 'Unauthorized' : error.message;
            next(error);
        }
    },

    verifyRefreshToken: async (token: string, keySecret: string) => {
        try {
            const payload = await jwt.verify(token, keySecret) as TokenPayload;
            if (!payload) throw createHttpError.Unauthorized();

            const cachedToken = await cache.get(payload.sub);
            if (cachedToken === token) return payload;

            throw createHttpError.Unauthorized();
        } catch (error: any) {
            throw createHttpError.Unauthorized(error.message);
        }
    },
};
