import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import createApiResponse from '../utils/createApiResponse';

export const validateRegisterBody = (req: Request, res: Response, next: NextFunction) =>
	validateBody(registerSchema, req.body, next);

export const validateLoginBody = (req: Request, res: Response, next: NextFunction) =>
	validateBody(loginSchema, req.body, next);

export const validateRefreshTokenBody = (req: Request, res: Response, next: NextFunction) =>
	validateBody(refreshTokenSchema, req.body, next);

// Validate Body
const validateBody = (schema: joi.ObjectSchema, body: any, next: NextFunction) => {
	const { error, value } = schema.validate(body);

	if (error) return next(createApiResponse('Bad Request', error.message, null));

	return next();
};

// Schemas

const registerSchema = joi.object({
	name: joi.string().required(),
	nickname: joi.string().required(),
	rg: joi.string().alphanum().required(),
	cpf: joi
		.string()
		.pattern(/^\d{11}$/)
		.required()
		.messages({ 'string.pattern.base': 'invalid CPF' }),
	gender: joi
		.string()
		.pattern(/^\M|F|O$/)
		.required()
		.messages({ 'string.pattern.base': 'invalid gender' }),
	birthday: joi.date().max('now').required(),
	email: joi.string().email().required(),
	password: joi.string().min(6).required(),
	phone: joi
		.string()
		.pattern(/^\d{10,11}$/)
		.required()
		.messages({ 'string.pattern.base': 'invalid phone number' }),
	address: joi.string().required(),
});

const loginSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().min(6).required(),
});

const refreshTokenSchema = joi.object({
	refreshToken: joi.string().required(),
});
