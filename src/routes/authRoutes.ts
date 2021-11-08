import { Router } from 'express';
import createApiResponse from '../utils/createApiResponse';
import authorize from '../middlewares/authorize';
import validateBody from '../middlewares/validateBody';
import userController from '../controllers/userController';
import tokenController from '../controllers/tokenController';

const router = Router();

router.post('/signup', validateBody.register, (req, res, next) => {
	return userController
		.create(req.body.username, req.body.email, req.body.password, req.ip)
		.then(user => next(createApiResponse('Created', 'Usuário criado com sucesso', user)))
		.catch(error => next(error));
});

router.get('/confirm/:confirmationCode', (req, res, next) => {
	return userController
		.activate(req.params.confirmationCode)
		.then(result => next(createApiResponse('OK', 'Conta ativada com sucesso', null)))
		.catch(error => next(error));
});

router.post('/login', validateBody.login, (req, res, next) => {
	return userController
		.login(req.body.username, req.body.password, req.ip ?? '0.0.0.0')
		.then(({ user, refreshToken, accessToken }) => {
			tokenController.setRefreshTokenCookie(res, refreshToken);
			tokenController.setAccessTokenHeader(res, accessToken);

			return next(createApiResponse('OK', 'Usuário logado com sucesso', user));
		})
		.catch(error => next(error));
});

router.get('/refresh-token', (req, res, next) => {
	return tokenController
		.generateAccessToken(req.cookies['refreshToken'])
		.then(accessToken => {
			tokenController.setAccessTokenHeader(res, accessToken);
			return next(createApiResponse('Created', 'Token de acessso gerado com sucesso', accessToken));
		})
		.catch(error => next(error));
});

router.get('/logout', authorize, (req, res, next) => {
	return tokenController
		.revokeRefreshToken(req.cookies['refreshToken'], req.userId, req.ip)
		.then(() => {
			res.cookie('refreshToken', undefined);
			res.header('authorization', undefined);

			return next(createApiResponse('OK', 'Sessão encerrada com sucesso', null));
		})
		.catch(error => next(error));
});

router.post('/revoke-token', authorize, validateBody.refreshToken, (req, res, next) => {
	return tokenController
		.revokeRefreshToken(req.body.refreshToken, req.userId, req.ip)
		.then(() => next(createApiResponse('OK', 'Sessão encerrada com sucesso', null)))
		.catch(error => next(error));
});

export default router;
