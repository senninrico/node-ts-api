import ApiError from '@src/util/errors/api-error';
import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

export function rateLimiter(req: Partial<Request>, _: Partial<Response>): void {
  console.log('kk');
  const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute in milliseconds
    max: 10,
    keyGenerator(req: Request): string {
      return req.ip;
    },
    handler(_, res: Response): void {
      res.status(429).send(
        ApiError.format({
          code: 429,
          message: "Too many requests to the '/forecast endpoint'",
        })
      );
    },
  });
}
