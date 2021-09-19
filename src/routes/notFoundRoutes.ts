import { Router } from 'express';
import createApiResponse from '../utils/createApiResponse';
const router = Router();

router.use(`*`, (req, res, next) =>
	next(createApiResponse('Not Found', `No route found for method ${req.method} on '${req.path}'`, null))
);

export default router;
