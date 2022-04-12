import {
  ClassMiddleware,
  Controller,
  Post,
  Get,
  Delete,
} from '@overnightjs/core';
import { Court } from '@src/models/court';
import { Request, Response } from 'express';
import { BaseController } from '.';
import logger from '@src/logger';
import { authMiddleware } from '@src/middlewares/auth';
import { StatusCodes } from 'http-status-codes';

@Controller('courts')
@ClassMiddleware(authMiddleware)
export class CourtsController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const court = new Court({
        ...req.body,
        ...{ userId: req.context?.userId },
      });
      logger.info(JSON.stringify(court));
      const result = await court.save();
      res.status(StatusCodes.CREATED).send(result);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Get('')
  public async GetCourt(req: Request, res: Response): Promise<void> {
    const courts = await Court.find({ userId: req.context?.userId }).limit(10);
    res.status(StatusCodes.OK).send(courts);
  }

  @Get(':id')
  private async get(req: Request, res: Response) {
    logger.info(req.params.id);
    const court = await Court.findById(req.params.id);
    return res.status(StatusCodes.OK).send(court);
  }

  @Delete(':id')
  public async delete(req: Request, res: Response): Promise<Response> {
    const courtId = req.params.id;
    const court = await Court.findOneAndRemove({ _id: courtId });

    return res.status(StatusCodes.OK).send({ message: 'Court Deleted.' });
  }
}
