import { Router } from 'express';
import createApiResponse from '../utils/createApiResponse';
import authorize from '../middlewares/authorize';
import { validateRegisterBody, validateLoginBody, validateRefreshTokenBody } from '../middlewares/validateBody';
import { createUser, loginUser } from '../controllers/userController';
import {
	generateAccessToken,
	revokeRefreshToken,
	setAccessTokenHeader,
	setRefreshTokenCookie,
} from '../controllers/tokenController';

const router = Router();

router.post('/register', validateRegisterBody, (req, res, next) => {
	return createUser(req.body, req.socket.remoteAddress ?? '0.0.0.0')
		.then(({ user, refreshToken, accessToken }) => {
			setRefreshTokenCookie(res, refreshToken);
			setAccessTokenHeader(res, accessToken);

			return next(createApiResponse('Created', 'Usuário criado com sucesso', user));
		})
		.catch(error => next(error));
});

router.post('/login', validateLoginBody, (req, res, next) => {
	return loginUser(req.body.email, req.body.password, req.socket.remoteAddress ?? '0.0.0.0')
		.then(({ user, refreshToken, accessToken }) => {
			setRefreshTokenCookie(res, refreshToken);
			setAccessTokenHeader(res, accessToken);

			return next(createApiResponse('OK', 'Usuário logado com sucesso', user));
		})
		.catch(error => next(error));
});

router.get('/refresh-token', (req, res, next) => {
	return generateAccessToken(req.cookies['refreshToken'])
		.then(accessToken => {
			setAccessTokenHeader(res, accessToken);
			return next(createApiResponse('Created', 'Access Token gerado com sucesso', accessToken));
		})
		.catch(error => next(error));
});

router.get('/logout', authorize, (req, res, next) => {
	return revokeRefreshToken(req.cookies['refreshToken'], req.userId, req.ip)
		.then(() => {
			res.cookie('refreshToken', undefined);
			res.header('authorization', undefined);

			return next(createApiResponse('OK', 'Sessão encerrada com sucesso', null));
		})
		.catch(error => next(error));
});

router.post('/revoke-token', authorize, validateRefreshTokenBody, (req, res, next) => {
	return revokeRefreshToken(req.body.refreshToken, req.userId, req.ip)
		.then(() => next(createApiResponse('OK', 'Sessão encerrada com sucesso', null)))
		.catch(error => next(error));
});

export default router;
