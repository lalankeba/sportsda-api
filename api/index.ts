import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import logger from './config/logger-config';
import rateLimiter from './config/rate-limiter';
import RequestLogger from './middleware/request-logger';
import homeRoute from './routes/home-route';

const app = express();
const PORT: number = parseInt(process.env.PORT || '3010', 10);

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

app.listen(PORT, () => {
  logger.info(`App is running on port ${PORT}`);
});

export default app;
