import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db, { IdType } from '../db';
import { IUser } from '../models';
import tokenController from './tokenController';
import createApiResponse from '../utils/createApiResponse';
import { sendAccountConfirmationEmail, sendPasswordChangeConfirmationEmail, sendPasswordChangeRequestEmail } from '../utils/emailSender';

const getById = async (userId: IdType) => await db.User.findById(userId).exec();

const getByEmail = async (email: string) => await db.User.findOne({ email: email }).exec();

const getByUsername = async (username: string) => await db.User.findOne({ username: username }).exec();

const getByCpf = async (cpf: string) => await db.User.findOne({ cpf: cpf }).exec();

const getByRg = async (rg: string) => await db.User.findOne({ rg: rg }).exec();

const getAll = async () => await db.User.find().exec();

const create = async (username: string, email: string, password: string) => {
	if (await getByEmail(email)) throw createApiResponse('Bad Request', 'Email já cadastrado', null);
	if (await getByUsername(username)) throw createApiResponse('Bad Request', 'Nome de usuário já cadastrado', null);

	const user = await db.User.create({
		confirmationCode: jwt.sign({ email }, process.env.CONFIRMATION_TOKEN_SECRET),
		username: username.toLowerCase(),
		email: email,
		password: bcrypt.hashSync(password, 10),
	});

	await sendAccountConfirmationEmail(user.username, user.email, user.confirmationCode);

	return user;
};

const activate = async (confirmationCode: string) => {
	const user = await db.User.findOne({ confirmationCode: confirmationCode });

	if (!user) throw createApiResponse('Bad Request', 'Usuário não localizado', null);

	user.status = 'Active';
	await user.save();

	return true;
};

const login = async (username: string, password: string, ipAddress: string) => {
	const user = await getByUsername(username.toLowerCase());

	if (!user || !bcrypt.compareSync(password, user.password)) throw createApiResponse('Bad Request', 'Usuário ou senha inválidos', null);
	if (user.status === 'Pending') throw createApiResponse('Unauthorized', 'Conta pendente. Por favor verifique o seu email', null);

	const refreshToken = await tokenController.generateRefreshToken(user.id, ipAddress);
	const accessToken = await tokenController.generateAccessToken(refreshToken);

	return { user, refreshToken, accessToken };
};

const update = async (userId: string, updatedUser: IUser) => {
	const user = await getById(userId);

	if (!user) throw createApiResponse('Bad Request', 'Usuário não localizado', null);

	if (updatedUser.cpf && (await getByCpf(updatedUser.cpf))) throw createApiResponse('Bad Request', 'CPF já cadastrado', null);
	if (updatedUser.rg && (await getByRg(updatedUser.rg))) throw createApiResponse('Bad Request', 'RG já cadastrado', null);

	return db.User.findByIdAndUpdate(
		{ _id: userId },
		{
			$set: {
				address: updatedUser.address ?? user.address,
				birthday: updatedUser.birthday ?? user.birthday,
				cpf: updatedUser.cpf ?? user.cpf,
				gender: updatedUser.gender ?? user.gender,
				name: updatedUser.name ?? user.name,
				phone: updatedUser.phone ?? user.phone,
				rg: updatedUser.rg ?? user.rg,
			},
		},
		{ new: true }
	);
};

const updatePassword = async (userId: string, password: string) => {
	const user = await getById(userId);

	if (!user) throw createApiResponse('Bad Request', 'Usuário não localizado', null);
	if (bcrypt.compareSync(password, user.password)) throw createApiResponse('Bad Request', 'A nova senha não pode ser a mesma que a anterior.', null);

	await sendPasswordChangeConfirmationEmail(user.name ?? user.username, user.email);

	return db.User.findByIdAndUpdate(
		{ _id: userId },
		{
			$set: {
				password: bcrypt.hashSync(password, 10),
			},
		},
		{ new: true }
	);
};

const resetPasswordRequest = async (email: string) => {
	const user = await getByEmail(email);

	if (!user) return;

	const resetPasswordToken = await db.ResetPasswordToken.create({
		user: user.id,
		token: jwt.sign({}, process.env.RESET_PASSWORD_TOKEN_SECRET, {
			expiresIn: `${process.env.RESET_PASSWORD_TOKEN_EXPIRATION_IN_MINUTES}m`,
			issuer: process.env.ISSUER,
			audience: user.id,
		}),
		expiredAt: new Date(Date.now() + process.env.RESET_PASSWORD_TOKEN_EXPIRATION_IN_MINUTES * 60 * 1000),
	});
	await sendPasswordChangeRequestEmail(email, resetPasswordToken.token);

	return;
};

const resetPassword = async (resetToken: string, password: string) => {
	const resetPasswordToken = await db.ResetPasswordToken.findOne({ token: resetToken }).exec();

	if (!resetPasswordToken || resetPasswordToken.isExpired) throw createApiResponse('Bad Request', 'Link inválido ou expirado', null);

	return updatePassword(`${resetPasswordToken.user}`, password);
};

export default {
	getById,
	getByEmail,
	getByUsername,
	getByCpf,
	getByRg,
	getAll,
	create,
	activate,
	login,
	update,
	resetPasswordRequest,
	resetPassword,
	updatePassword,
};
