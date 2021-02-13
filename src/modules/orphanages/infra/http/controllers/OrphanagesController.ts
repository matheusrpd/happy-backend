import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateOrphanageService from '@modules/orphanages/services/CreateOrphanageService';
import ListOrphanagesActiveService from '@modules/orphanages/services/ListOrphanagesActiveService';
import ListOrphanagesNotActivesService from '@modules/orphanages/services/ListAllOrphanagesNotActiveService';
import FindOrphanageService from '@modules/orphanages/services/FindOrphanageService';
import UpdateOrphanageService from '@modules/orphanages/services/UpdateOrphanageService';
import DeleteOrphanageService from '@modules/orphanages/services/DeleteOrphanageService';

export default class OrphanagesController {

  public async index(request: Request, response: Response): Promise<Response> {
    const listOrphanagesService = container.resolve(ListOrphanagesActiveService);

    const orphanages = await listOrphanagesService.execute();

    return response.json(classToClass(orphanages));
  }

  public async getAllNotActives(request: Request, response: Response): Promise<Response> {
    const listOrphanagesService = container.resolve(ListOrphanagesNotActivesService);

    const orphanages = await listOrphanagesService.execute();

    return response.json(classToClass(orphanages));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOrphanageService = container.resolve(FindOrphanageService);

    const orphanage = await findOrphanageService.execute({ id });

    return response.json(classToClass(orphanage));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { 
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends,
      active
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
      active,
      images
    });
  
    return response.status(201).json(classToClass(orphanage));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { 
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends,
      active,
    } = request.body;
    const { id } = request.params;
    
    const updateOrphanage = container.resolve(UpdateOrphanageService);

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return {
        path: image.filename
      }
    });

    const updatedOrphanage = await updateOrphanage.execute({
      id,
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends,
      active,
      images
    });

    return response.status(200).json({ 
      orphanage: classToClass(updatedOrphanage) 
    });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteOrphanage = container.resolve(DeleteOrphanageService);

    const deletedOrphanage = await deleteOrphanage.execute({ id });

    return response.status(200).json(classToClass(deletedOrphanage));
  }
}