import { Router } from 'express';
import createApiResponse from '../utils/createApiResponse';
import userController from '../controllers/userController';
import tokenController from '../controllers/tokenController';
import authorize from '../middlewares/authorize';
import validateBody from '../middlewares/validateBody';
const router = Router();

router.get('/all', authorize, (req, res, next) =>
	userController
		.getAll()
		.then(userList => next(createApiResponse('OK', 'Lista de usuários retornado com sucesso', userList)))
		.catch(error => next(error))
);

router.get('/sessions', authorize, (req, res, next) =>
	tokenController
		.getSessionsByUserId(req.userId)
		.then(refreshTokenList => next(createApiResponse('OK', 'Sessões retornadas com sucesso', refreshTokenList)))
		.catch(error => next(error))
);

router.get('/me', authorize, (req, res, next) =>
	userController
		.getById(req.userId)
		.then(user => {
			if (!user) throw createApiResponse('OK', 'Usuário não localizado', user);

			return next(createApiResponse('OK', 'Usuário retornado com sucesso', user));
		})
		.catch(error => next(error))
);

router.post('/me', authorize, validateBody.userOptionalInfo, (req, res, next) =>
	userController
		.update(req.userId, req.body)
		.then(user => next(createApiResponse('OK', 'Usuário atualizado com sucesso', user)))
		.catch(error => next(error))
);

router.post('/password', authorize, validateBody.changePassword, (req, res, next) =>
	userController
		.updatePassword(req.userId, req.body.password)
		.then(user => next(createApiResponse('OK', 'Senha alterada com sucesso', user)))
		.catch(error => next(error))
);

router.get('/:id', authorize, (req, res, next) =>
	userController
		.getById(req.params.id)
		.then(user => {
			if (!user) throw createApiResponse('OK', 'Usuário não localizado', user);

			return next(createApiResponse('OK', 'Usuário retornado com sucesso', user));
		})
		.catch(error => next(error))
);

export default router;
