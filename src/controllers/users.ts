import { Controller, Post, Get, Middleware, Delete } from '@overnightjs/core';
import { Response, Request } from 'express';
import { User } from '@src/models/user';
import AuthService from '@src/services/auth';
import { BaseController } from './index';
import { authMiddleware } from '@src/middlewares/auth';
import logger from '@src/logger';
import { StatusCodes } from 'http-status-codes';

@Controller('users')
export class UsersController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const user = new User(req.body);
      const newUser = await user.save();
      res.status(StatusCodes.CREATED).send(newUser);
    } catch (error) {
      this.sendCreateUpdateErrorResponse(res, error);
    }
  }

  @Post('authenticate')
  public async authenticate(req: Request, res: Response): Promise<Response> {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return this.sendErrorResponse(res, {
        code: StatusCodes.UNAUTHORIZED,
        message: 'User not found!',
        description: 'Try verifying your email address.',
      });
    }
    if (
      !(await AuthService.comparePasswords(req.body.password, user.password))
    ) {
      return this.sendErrorResponse(res, {
        code: StatusCodes.UNAUTHORIZED,
        message: 'Password does not match!',
      });
    }
    const token = AuthService.generateToken(user.id);

    return res.send({ ...user.toJSON(), ...{ token } });
  }

  @Get('me')
  @Middleware(authMiddleware)
  public async me(req: Request, res: Response): Promise<Response> {
    const userId = req.context?.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return this.sendErrorResponse(res, {
        code: StatusCodes.NOT_FOUND,
        message: 'User not found!',
      });
    }

    return res.send({ user });
  }

  @Get('')
  @Middleware(authMiddleware)
  public async byEmail(req: Request, res: Response): Promise<Response> {
    logger.info('provide:', req.query.email);
    const user = await User.findOne({ email: req.query.email });
    if (!user) {
      return this.sendErrorResponse(res, {
        code: StatusCodes.NOT_FOUND,
        message: 'User not found!',
      });
    }

    return res.send({ user });
  }

  @Delete('')
  @Middleware(authMiddleware)
  public async delete(req: Request, res: Response): Promise<Response> {
    const userId = req.context?.userId;
    const user = await User.findOneAndRemove({ _id: userId });

    return res.status(StatusCodes.OK).send({ message: 'User Deleted.' });
  }
}
