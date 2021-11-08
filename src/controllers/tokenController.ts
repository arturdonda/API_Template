import db, { IdType } from '../db';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import createApiResponse from '../utils/createApiResponse';
import { getIpInfo } from '../utils/ipData';

const generateRefreshToken = async (userId: IdType, ipAddress: string) => {
	const ipInfo = await getIpInfo(ipAddress);

	const refreshToken = await db.RefreshToken.create({
		user: userId,
		token: jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: `${process.env.REFRESH_TOKEN_EXPIRATION_IN_DAYS}d`,
			issuer: process.env.ISSUER,
			audience: `${userId}`,
		}),
		expiredAt: new Date(Date.now() + process.env.REFRESH_TOKEN_EXPIRATION_IN_DAYS * 24 * 60 * 60 * 1000),
		createdByIp: ipInfo,
	});

	return refreshToken.token;
};

const generateAccessToken = async (refreshToken: string) => {
	const rToken = await getRefreshToken(refreshToken);

	if (!rToken.isActive) throw createApiResponse('Bad Request', 'Refresh Token is inactive', null);

	return jwt.sign({}, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: `${process.env.ACCESS_TOKEN_EXPIRATION_IN_MINUTES}m`,
		issuer: process.env.ISSUER,
		audience: `${rToken.user}`,
	});
};

const getRefreshToken = async (refreshToken: string) => {
	const rToken = await db.RefreshToken.findOne({ token: refreshToken });

	if (!rToken) throw createApiResponse('Bad Request', 'No token found', null);

	return rToken;
};

const getSessionsByUserId = async (userId: IdType) => {
	const refreshTokenList = (await db.RefreshToken.find({ user: userId })).filter(
		refreshToken => refreshToken.isActive
	);

	if (refreshTokenList.length === 0) throw createApiResponse('OK', 'No active sessions found', refreshTokenList);

	return refreshTokenList;
};

const revokeRefreshToken = async (refreshToken: string, userId: IdType, ipAddress: string) => {
	const rToken = await getRefreshToken(refreshToken);
	const ipInfo = await getIpInfo(ipAddress);

	if (userId != rToken.user) throw createApiResponse('Forbidden', 'You cannot end this session.', null);

	rToken.revokedAt = new Date();
	rToken.revokedByIp = ipInfo;
	await rToken.save();

	return;
};

const setRefreshTokenCookie = (res: Response, refreshToken: string) =>
	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		expires: new Date(Date.now() + process.env.REFRESH_TOKEN_EXPIRATION_IN_DAYS * 24 * 60 * 60 * 1000),
	});

const setAccessTokenHeader = (res: Response, accessToken: string) =>
	res.header('authorization', `Bearer ${accessToken}`);

export default {
	generateRefreshToken,
	generateAccessToken,
	getRefreshToken,
	getSessionsByUserId,
	revokeRefreshToken,
	setRefreshTokenCookie,
	setAccessTokenHeader,
};
