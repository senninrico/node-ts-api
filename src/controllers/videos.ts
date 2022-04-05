import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('videos')
export class VideosController {
  @Post('start')
  public async startVideo(req: Request, res: Response): Promise<void> {
    res.status(201).send(req.body);
  }

  @Post('stop')
  public async endVideo(req: Request, res: Response): Promise<void> {
    res.status(201).send(req.body);
  }

  @Get('shot')
  public async shot(req: Request, res: Response): Promise<void> {
    const instante = new Date();
    res.status(200).send({ ...req.body, ...{ instante } });
  }
}
