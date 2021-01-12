import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrphanageService from '@modules/orphanages/services/CreateOrphanageService';
import ListOrphanagesService from '@modules/orphanages/services/ListOrphanagesService';
import FindOrphanageService from '@modules/orphanages/services/FindOrphanageService';

export default class OrphanagesController {

  public async index(request: Request, response: Response): Promise<Response> {
    const listOrphanagesService = container.resolve(ListOrphanagesService);

    const orphanages = await listOrphanagesService.execute();

    return response.json(orphanages);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOrphanageService = container.resolve(FindOrphanageService);

    const orphanage = await findOrphanageService.execute({ id });

    return response.json(orphanage);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { 
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends 
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return {
        path: image.filename
      }
    });

    const createOrphanageService = container.resolve(CreateOrphanageService);

    const orphanage = await createOrphanageService.execute({
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends,
      images
    });
  
    return response.status(201).json(orphanage);
  }
}