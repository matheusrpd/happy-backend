import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRoleService from '@modules/users/services/CreateRoleService';

export default class RolesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, permissions } = request.body;

    const createRole = container.resolve(CreateRoleService);

    const role = await createRole.execute({
      name,
      description,
      permissions
    });

    return response.json(role);
  }
}