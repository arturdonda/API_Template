import { Router } from 'express';
import homeRoutes from './homeRoutes';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import notFoundRoutes from './notFoundRoutes';

const router = Router();

//Importing routes
router.use(`/`, homeRoutes);
router.use(`/auth`, authRoutes);
router.use(`/user`, userRoutes);
router.use(`*`, notFoundRoutes);

export default router;
