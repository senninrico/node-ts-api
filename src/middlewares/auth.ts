import { Request, Response, NextFunction } from 'express';
import AuthService from '@src/services/auth';

export function authMiddleware(
  req: Partial<Request>,
  res: Partial<Response>,
  next: NextFunction
): void {
  console.log(req.headers);
  const token = req.headers?.['authorization'];
  try {
    if (!token) {
      throw '401';
    }

    let t = token as string;

    if (!t.includes('Bearer')) {
      throw '401';
    } else {
      t = t.split(' ')[1];
    }
    const claims = AuthService.decodeToken(t);
    req.context = { userId: claims.sub };
    next();
  } catch (err) {
    if (err instanceof Error) {
      res.status?.(401).send({ code: 401, error: err.message });
    } else {
      res.status?.(401).send({ code: 401, error: 'Unknown auth error' });
    }
  }
}
