import { NextFunction, Request, Response } from 'express';
import createHttpError, { HttpError } from 'http-errors';
import HttpResponse from '../helper/response';

const notFound = (req: Request, res: Response, next: NextFunction) => {
    next(createHttpError.NotFound());
};

const responseErrors = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    handleError(err, req, res);
};

const handleError = (err: HttpError, req: Request, res: Response) => {
    const code = err.statusCode || 500;
    const message = err.message && err.statusCode != 500 ? err.message : 'Internal server error';

    HttpResponse(res, { code, message });
};

export { notFound, responseErrors };
