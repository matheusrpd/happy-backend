import { getRepository, Repository } from 'typeorm';

import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';
import ICreateOrphanageDTO from '@modules/orphanages/dtos/ICreateOrphanageDTO';
import IFindOrphanageDTO from '@modules/orphanages/dtos/IFindOrphanageDTO';

import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';

class OrphanagesRepository implements IOrphanagesRepository {
  private ormRepository: Repository<Orphanage>;

  constructor() {
    this.ormRepository = getRepository(Orphanage);
  }

  public async find(): Promise<Orphanage[]> {
    const orphanages = await this.ormRepository.find({
      relations: ['images']
    });

    return orphanages;
  }

  public async findById({ id }: IFindOrphanageDTO): Promise<Orphanage> {
    const orphanage = await this.ormRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return orphanage;
  }

  public async create({
    name, 
    latitude, 
    longitude, 
    about, 
    instructions, 
    opening_hours, 
    open_on_weekends,
    images
  }: ICreateOrphanageDTO): Promise<Orphanage> {

    const orphanage = this.ormRepository.create({
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends,
      images
    });

    await this.ormRepository.save(orphanage);

    return orphanage;
  }
}

export default OrphanagesRepository;
