import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import createApiResponse from '../utils/createApiResponse';
import { isUsernameValid, isEmailValid, isPasswordValid, isCpfValid, isRgValid, isNameValid, isPhoneValid } from '../utils/validation';

export default {
	register: (req: Request, res: Response, next: NextFunction) => validateBody(registerSchema, req.body, next),
	login: (req: Request, res: Response, next: NextFunction) => validateBody(loginSchema, req.body, next),
	refreshToken: (req: Request, res: Response, next: NextFunction) => validateBody(refreshTokenSchema, req.body, next),
	userOptionalInfo: (req: Request, res: Response, next: NextFunction) => validateBody(userOptionalInfoSchema, req.body, next),
};

const validateBody = (schema: joi.ObjectSchema, body: any, next: NextFunction) => {
	const { error } = schema.validate(body);

	if (error) return next(createApiResponse('Bad Request', error.message, null));

	return next();
};

// Fields
const addressValidation = joi.string().error(new Error('Endereço inválido'));

const birthdayValidation = joi.date().greater('1-1-1900').less('now').error(new Error('Data de nascimento inválida'));

const cpfValidation = joi
	.string()
	.custom(value => {
		if (!isCpfValid(value)) throw new Error();

		return value;
	})
	.error(new Error('CPF inválido'));

const emailValidation = joi
	.string()
	.custom(value => {
		if (!isEmailValid(value)) throw new Error();

		return value;
	})
	.error(new Error('Email inválido'));

const genderValidation = joi.string().valid('M', 'F', 'O').insensitive().error(new Error('Gênero inválido'));

const nameValidation = joi
	.string()
	.custom(value => {
		if (!isNameValid(value)) throw new Error();

		return value;
	})
	.error(new Error('Nome inválido'));

const passwordValidation = joi
	.string()
	.custom(value => {
		if (!isPasswordValid(value)) throw new Error();

		return value;
	})
	.error(new Error('Senha inválida'));

const phoneValidation = joi
	.string()
	.custom(value => {
		if (!isPhoneValid) throw new Error();

		return value;
	})
	.error(new Error('Telefone inválido'));

const refreshTokenValidation = joi.string().error(new Error('Token inválido'));

const rgValidation = joi
	.string()
	.custom(value => {
		if (!isRgValid) throw new Error();

		return value;
	})
	.error(new Error('RG inválido'));

const usernameValidation = joi
	.string()
	.custom(value => {
		if (!isUsernameValid(value)) throw new Error();

		return value;
	})
	.error(new Error('Username inválido'));

// Schemas
const loginSchema = joi.object({
	username: usernameValidation.required(),
	password: passwordValidation.required(),
});

const registerSchema = joi.object({
	username: usernameValidation.required(),
	email: emailValidation.required(),
	password: passwordValidation.required(),
});

const refreshTokenSchema = joi.object({
	refreshToken: refreshTokenValidation.required(),
});

const userOptionalInfoSchema = joi.object({
	address: addressValidation.optional().allow(null),
	birthday: birthdayValidation.optional().allow(null),
	cpf: cpfValidation.optional().allow(null),
	gender: genderValidation.allow(null),
	name: nameValidation.optional().allow(null),
	phone: phoneValidation.optional().allow(null),
	rg: rgValidation.optional().allow(null),
});
