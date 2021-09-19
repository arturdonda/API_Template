import { Router } from 'express';
import createApiResponse from '../utils/createApiResponse';
import { getAllUsers, getUserById } from '../controllers/userController';
import { getSessionsByUserId } from '../controllers/tokenController';
import authorize from '../middlewares/authorize';
const router = Router();

router.get('/all', authorize, (req, res, next) =>
	getAllUsers()
		.then(userList => next(createApiResponse('OK', 'Lista de usuários retornado com sucesso', userList)))
		.catch(error => next(error))
);

router.get('/sessions', authorize, (req, res, next) =>
	getSessionsByUserId(req.userId)
		.then(refreshTokenList => next(createApiResponse('OK', 'Sessões retornadas com sucesso', refreshTokenList)))
		.catch(error => next(error))
);

router.get('/:id', authorize, (req, res, next) =>
	getUserById(req.params.id)
		.then(user => {
			if (!user) throw createApiResponse('OK', 'No user found', user);

			return next(createApiResponse('OK', 'Usuário retornado com sucesso', user));
		})
		.catch(error => next(error))
);

export default router;
