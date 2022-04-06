import { Controller, Get, Post } from '@overnightjs/core';
import { Cam } from '@src/models/cam';
import { Request, Response } from 'express';
import { BaseController } from '.';

@Controller('Cams')
export class CamsController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const cam = new Cam({ ...req.body, ...{ user: req.decoded?.id } });
      const result = await cam.save();
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
