import { Controller, Get, Post } from '@overnightjs/core';
import { Recording } from '@src/models/recording';
import RecService from '@src/services/recVideos';
import { Request, Response } from 'express';
import { BaseController } from '.';

@Controller('videos')
export class VideosController extends BaseController {
  @Post('start')
  public async startVideo(req: Request, res: Response): Promise<void> {
    try {
      const rec = new Recording({ ...req.body, ...{ user: req.decoded?.id } });
      const recs = RecService.recordingCam(rec.court);
      if (recs.recording) {
        rec.pid = recs.pid;
      }
      const result = await rec.save();

      res.status(201).send(result);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Post('stop')
  public async endVideo(req: Request, res: Response): Promise<void> {
    res.status(201).send(req.body);
  }

  @Get('shot')
  public async shot(req: Request, res: Response): Promise<void> {
    const instante = new Date().toLocaleString();
    res.status(200).send({ ...req.body, ...{ instante } });
  }
}
