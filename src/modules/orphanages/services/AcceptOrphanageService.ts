import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IOrphanagesRepository from '../repositories/IOrphanagesRepository';
import Orphanage from '../infra/typeorm/entities/Orphanage';

interface IRequest {
  id: string;
  active: boolean,
}

@injectable()
class AcceptOrphanageService {
  constructor(
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,
  ) {}

  async execute({ id, active }: IRequest): Promise<Orphanage> {
    const orphanage = await this.orphanagesRepository.findById({ id });

    if (!orphanage) {
      throw new AppError('Orphanage not found.', 404);
    }

    orphanage.active = active;

    return this.orphanagesRepository.save(orphanage);
  }
}

export default AcceptOrphanageService;