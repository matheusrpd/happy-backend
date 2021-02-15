import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListOrphanagesActiveService from '@modules/orphanages/services/ListOrphanagesActiveService';
import FindOrphanageService from '@modules/orphanages/services/FindOrphanageService';

export default class OrphanagesController {

  public async index(request: Request, response: Response): Promise<Response> {
    const listOrphanagesService = container.resolve(ListOrphanagesActiveService);

    const orphanages = await listOrphanagesService.execute();

    return response.json(classToClass(orphanages));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOrphanageService = container.resolve(FindOrphanageService);

    const orphanage = await findOrphanageService.execute({ id });

    return response.json(classToClass(orphanage));
  }
}