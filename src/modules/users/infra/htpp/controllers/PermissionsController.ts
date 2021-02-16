import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePermissionService from '@modules/users/services/CreatePermissionService';

export default class PermissionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createPermission = container.resolve(CreatePermissionService);

    const permission = await createPermission.execute({
      name,
      description,
    });

    return response.json(permission);
  }
}