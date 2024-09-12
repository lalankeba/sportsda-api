import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import logger from './config/logger-config';
import RequestLogger from './middleware/request-logger';

const app = express();
const PORT: number = parseInt(process.env.PORT || '3010', 10);

app.use(RequestLogger);
app.use(express.json());

app.get("/", (req: Request, res: Response) => res.json({"msg": "Welcome to sports data analyser API"}));

app.listen(PORT, () => {
  logger.info(`App is running on port ${PORT}`);
});

export default app;
