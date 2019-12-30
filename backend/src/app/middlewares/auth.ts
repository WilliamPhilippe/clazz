import { Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { RequestC, UserRequest } from '../util/Interfaces';
import authConfig from '../../config/auth';
import CODE from '../util/CodeIntegration';

export default async (
  req: RequestC,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: CODE.err.auth.TOKEN_NOT_PROVIDED });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded: UserRequest = await promisify(jwt.verify)(
      token,
      authConfig.secret
    );
    req.user = {
      id: decoded.id,
      proUser: decoded.proUser,
      teacherUser: decoded.teacherUser,
    };

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: CODE.err.auth.TOKEN_INVALID_OR_EXPIRED });
  }
};
