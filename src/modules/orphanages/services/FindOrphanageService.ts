import { injectable, inject } from 'tsyringe';

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

    return orphanage;
  }
}

export default FindOrphanageService;