import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('courts')
export class CourtsController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    res.status(201).send(req.body);
  }

  @Get('')
  public async GetCourt(req: Request, res: Response): Promise<void> {
    res.status(200).send(req.body);
  }
}
