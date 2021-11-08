import { Router } from 'express';
import createApiResponse from '../utils/createApiResponse';
const router = Router();

router.use(`*`, (req, res, next) =>
	next(createApiResponse('Not Found', `Nenhuma rota encontrada para o método ${req.method} em '${req.path}'`, null))
);

export default router;
