require('dotenv').config();
import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes';
import apiResponse from './middlewares/apiResponse';

const app = express();

// Configuring Proxy
app.set('trust proxy', true);

// Configuring Middlewares
app.use(express.json());
app.use(cookieParser());

// Importing routes
app.use('/api', routes);

// Standardizing API Response
app.use(apiResponse);

// Starting Server
app.listen(process.env.PORT, () => console.log(`[Server]: ⚡️ Running on port ${process.env.PORT}`));
