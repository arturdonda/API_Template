import db, { IdType } from '../db';
import { IUser } from '../models';
import bcrypt from 'bcryptjs';
import { isCpfValid, isEmailValid } from '../utils/validation';
import { generateRefreshToken, generateAccessToken } from './tokenController';
import createApiResponse from '../utils/createApiResponse';

export const getUserById = async (userId: IdType) => await db.User.findById(userId).exec();

export const getUserByEmail = async (email: string) => await db.User.findOne({ email: email }).exec();

export const getUserByNickname = async (nickname: string) => await db.User.findOne({ nickname: nickname }).exec();

export const getUserByCpf = async (cpf: string) => await db.User.findOne({ cpf: cpf }).exec();

export const getUserByRg = async (rg: string) => await db.User.findOne({ rg: rg }).exec();

export const getAllUsers = async () => {
	const userList = db.User.find().exec();

	if ((await userList).length === 0) throw createApiResponse('OK', 'No users found', userList);

	return userList;
};

export const createUser = async (user: IUser, ipAddress: string) => {
	if (await getUserByEmail(user.email)) throw createApiResponse('Bad Request', 'e-mail já cadastrado', null);
	if (await getUserByNickname(user.nickname)) throw createApiResponse('Bad Request', 'nickname já cadastrado', null);
	if (!isCpfValid(user.cpf)) throw createApiResponse('Bad Request', 'CPF inválido', null);
	if (await getUserByCpf(user.cpf)) throw createApiResponse('Bad Request', 'CPF já cadastrado', null);
	if (await getUserByRg(user.rg)) throw createApiResponse('Bad Request', 'RG já cadastrado', null);

	const newUser = await db.User.create({ ...user, password: bcrypt.hashSync(user.password, 10) });
	const refreshToken = await generateRefreshToken(newUser.id, ipAddress);
	const accessToken = await generateAccessToken(refreshToken);

	return { user: newUser, refreshToken, accessToken };
};

export const loginUser = async (email: string, password: string, ipAddress: string) => {
	if (!isEmailValid(email)) throw createApiResponse('Bad Request', 'Invalid email', null);

	const user = await getUserByEmail(email);

	if (!user || !bcrypt.compareSync(password, user.password))
		throw createApiResponse('Bad Request', 'Invalid email or password', null);

	const refreshToken = await generateRefreshToken(user.id, ipAddress);
	const accessToken = await generateAccessToken(refreshToken);

	return { user, refreshToken, accessToken };
};
