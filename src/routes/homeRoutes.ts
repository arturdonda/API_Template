import { Router } from 'express';
import createApiResponse from '../utils/createApiResponse';
const router = Router();

router.get('/', (req, res, next) =>
	next(
		createApiResponse('OK', 'Welcome to MeuCondominio_API', {
			api: 'MeuCondominio API',
			version: '0.0.1',
		})
	)
);

export default router;
