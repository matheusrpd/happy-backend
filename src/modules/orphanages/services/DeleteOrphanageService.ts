import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';
import Orphanage from '../infra/typeorm/entities/Orphanage';

interface IRequest {
  id: string;
}

@injectable()
class DeleteOrphanageService {

  constructor (
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository
  ){}

  public async execute({ id }: IRequest): Promise<Orphanage> {
    const orphanage = await this.orphanagesRepository.findById({ id });
    
    if (!orphanage) {
      throw new AppError('Orphanage not found.', 404);
    }

    const deletedOrphanage = await this.orphanagesRepository.delete({ orphanage });

    if (!deletedOrphanage) {
      throw new AppError('Error with deleting orphanage.');
    }

    return deletedOrphanage;
  }
}

export default DeleteOrphanageService;