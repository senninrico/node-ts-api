import { Controller, Get, Post, Middleware } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Beach } from '@src/models/beach';
import mongoose from 'mongoose';
import { BaseController } from './index';
import { authMiddleware } from '@src/middlewares/auth';

@Controller('beaches')
export class BeachesController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const beach = new Beach(req.body);
      const result = await beach.save();
      res.status(201).send(result);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Get('')
  @Middleware(authMiddleware)
  public async getTest(req: Request, res: Response): Promise<void> {
    res.status(200).send({ test: 'ok' });
  }
}
