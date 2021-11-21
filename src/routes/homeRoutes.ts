import { Router } from 'express';
import createApiResponse from '../utils/createApiResponse';
const router = Router();

router.get('/', (req, res, next) =>
	next(
		createApiResponse('OK', 'Bem vindo(a) ao Template NodeJS API', {
			api: 'API Template',
			version: '0.0.1',
		})
	)
);

export default router;
