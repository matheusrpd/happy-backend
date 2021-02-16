import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import VerifyPermissionService from '@modules/users/services/VerifyPermissionService';

import AppError from '@shared/errors/AppError';

function is(role: string[]) {
  const ensurePermission = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
      const verifyPermission = container.resolve(VerifyPermissionService);
  
      const existRoles = await verifyPermission.execute({
        id: request.user.id,
        role
      });

      if (existRoles) {
        return next();
      }
  
      throw new AppError('Not authorized.', 401);
  };

  return ensurePermission;
}

export { is };