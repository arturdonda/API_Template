require('dotenv').config();
import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes';
import apiResponse from './middlewares/apiResponse';

const app = express();

//Configuring Middlewares
app.use(express.json());
// app.use(express.urlencoded({extended: true})); //what for?
app.use(cookieParser());

//Importing routes
app.use('/api', routes);

//Standardizing API Response
app.use(apiResponse);

//Starting Server
app.listen(process.env.PORT, () => console.log(`[Server]: ⚡️ Running on port ${process.env.PORT}`));
