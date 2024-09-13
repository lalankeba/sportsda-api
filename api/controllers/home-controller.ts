import { NextFunction, Request, Response } from "express";
import logger from "../config/logger-config";
import * as homeService from "../services/home-service";

const init = async (req: Request, res: Response, next: NextFunction) => {
  try {
      logger.info(`Initilizing...`);
      const homeResp = await homeService.init();
      res.status(200).json(homeResp);
  } catch (err) {
      next(err);
  }
}

export { init };
