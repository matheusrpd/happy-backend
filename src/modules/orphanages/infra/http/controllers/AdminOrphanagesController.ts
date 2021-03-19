import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AceeptOrphanageService from '@modules/orphanages/services/AcceptOrphanageService';

export default class AdminOrphanagesController {

  public async update(request: Request, response: Response): Promise<Response> {
    const { active } = request.body;
    const { id } = request.params;
    
    const acceptOrphanage = container.resolve(AceeptOrphanageService);

    const updatedOrphanage = await acceptOrphanage.execute({
      id,
      active
    });

    return response.status(200).json({ 
      orphanage: classToClass(updatedOrphanage) 
    });
  }
}