import { injectable, inject } from 'tsyringe';

import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';

import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';

@injectable()
class ListOrphanagesService {

  constructor (
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository
  ){}

  public async execute(): Promise<Orphanage[]> {

    const orphanages = await this.orphanagesRepository.find();

    return orphanages;
  }
}

export default ListOrphanagesService;