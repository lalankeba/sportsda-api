import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import logger from './config/logger-config';
import rateLimiter from './config/rate-limiter';
import RequestLogger from './middleware/request-logger';
import homeRoute from './routes/home-route';
import authRoute from './routes/auth-route';
import notFoundHandler from './middleware/not-found-handler';
import errorHandler from './middleware/error-handler';
import mongoose from 'mongoose';

const app = express();
const port: number = parseInt(process.env.PORT || '3010', 10);
const mongoUri: string = process.env.DB_URI || '';

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true
}

app.use(cors(corsOptions));
app.use(rateLimiter);
app.use(RequestLogger);
app.use(express.json());

app.use('/', homeRoute);
app.use('/auth', authRoute);

// handling errors
app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    logger.info('Connecting to database...');
    const conn = await mongoose.connect(mongoUri);
    logger.info(`Connected host: ${conn.connection.host} on port: ${conn.connection.port} to database: ${conn.connection.name}`);

    app.listen(port, () => {
      logger.info(`App is running on port ${port}`);
    });
  } catch (error) {
    logger.error(`Error connecting with db ${error}`);
    process.exit(1);
  }
}

startServer();

export default app;
