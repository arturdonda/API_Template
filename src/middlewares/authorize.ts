import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createApiResponse from '../utils/createApiResponse';

export default async (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))
		return next(createApiResponse('Unauthorized', 'You must login first', null));

	jwt.verify(
		req.headers.authorization.split(' ')[1],
		process.env.ACCESS_TOKEN_SECRET,
		{ issuer: process.env.ISSUER },
		(error, payload) => {
			if (error)
				return error.name === 'TokenExpiredError'
					? next(createApiResponse('Unauthorized', 'Access Token expired', null))
					: next(createApiResponse('Unauthorized', 'You must login first', null));

			req.userId = (payload as JwtToken).aud;
			return next();
		}
	);
};

interface JwtToken {
	iat: number;
	exp: number;
	aud: string;
	iss: string;
}
