import { Controller, Get, Post, ClassMiddleware } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Beach } from '@src/models/beach';
import { BaseController } from './index';
import { authMiddleware } from '@src/middlewares/auth';
import { StatusCodes } from 'http-status-codes';
import logger from '@src/logger';

@Controller('beaches')
@ClassMiddleware(authMiddleware)
export class BeachesController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const beach = new Beach({
        ...req.body,
        ...{ userId: req.context?.userId },
      });
      const result = await beach.save();
      res.status(StatusCodes.CREATED).send(result);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Get('')
  public async getAll(req: Request, res: Response): Promise<void> {
    const beaches = await Beach.find({ userId: req.context?.userId }).limit(10);
    res.status(StatusCodes.OK).send(beaches);
  }

  @Get(':id')
  private async get(req: Request, res: Response) {
    logger.info(req.params.id);
    const beach = await Beach.findById(req.params.id);
    return res.status(StatusCodes.OK).send(beach);
  }
}
