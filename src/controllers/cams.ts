import { Controller, Get, Post, ClassMiddleware } from '@overnightjs/core';
import logger from '@src/logger';
import { authMiddleware } from '@src/middlewares/auth';
import { Cam } from '@src/models/cam';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController } from '.';

@Controller('cams')
@ClassMiddleware(authMiddleware)
export class CamsController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      logger.info('Input:', JSON.stringify(req.body));
      const cam = new Cam(req.body);
      const result = await cam.save();
      res.status(StatusCodes.CREATED).send(result);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Get('')
  public async GetCourt(req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).send(req.body);
  }
}
