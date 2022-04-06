import { Controller, Get, Post } from '@overnightjs/core';
import { Court } from '@src/models/court';
import { Request, Response } from 'express';
import { BaseController } from '.';

@Controller('courts')
export class CourtsController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const court = new Court({ ...req.body, ...{ user: req.decoded?.id } });
      const result = await court.save();
      res.status(201).send(result);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Get('')
  public async GetCourt(req: Request, res: Response): Promise<void> {
    res.status(200).send(req.body);
  }
}
