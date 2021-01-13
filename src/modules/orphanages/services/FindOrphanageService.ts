import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';

import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';

interface IRequest {
  id: string;
}

@injectable()
class FindOrphanageService {

  constructor (
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository
  ){}

  public async execute({ id }: IRequest): Promise<Orphanage> {
    const orphanage = await this.orphanagesRepository.findById({ id });

    if (!orphanage) {
      throw new AppError('Orphanage not found.');
    }

    return orphanage;
  }
}

export default FindOrphanageService;