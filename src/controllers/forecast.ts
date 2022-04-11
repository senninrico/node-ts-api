import {
  Controller,
  Get,
  ClassMiddleware,
  Post,
  Middleware,
} from '@overnightjs/core';
import { Request, Response } from 'express';
import { Beach } from '@src/models/beach';
import { Forecast } from '@src/services/forecast';
import { authMiddleware } from '@src/middlewares/auth';
import { BaseController } from '.';
import logger from '@src/logger';

import rateLimiter from '@src/middlewares/rateLimiter';

const forecast = new Forecast();
@Controller('forecast')
//@ClassMiddleware(authMiddleware)
export class ForecastController extends BaseController {
  @Get('')
  @Middleware(authMiddleware)
  public async getForecastForgeLoggedUser(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const beaches = await Beach.find({ userId: req.decoded?.id });
      const forecastData = await forecast.processForecastForBeaches(beaches);
      res.status(200).send(forecastData);
    } catch (error) {
      logger.error(error);
      this.sendErrorResponse(res, {
        code: 500,
        message: 'Something went wrong',
      });
    }
  }

  @Post('')
  @Middleware(rateLimiter)
  public async GetCourt(req: Request, res: Response): Promise<void> {
    res.status(200).send(req.body);
  }
}
