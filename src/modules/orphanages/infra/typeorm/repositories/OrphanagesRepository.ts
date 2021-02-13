import { getRepository, Repository } from 'typeorm';

import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';
import ICreateOrphanageDTO from '@modules/orphanages/dtos/ICreateOrphanageDTO';
import IFindOrphanageDTO from '@modules/orphanages/dtos/IFindOrphanageDTO';
import IDeleteOrphanageDTO from '@modules/orphanages/dtos/IDeleteOrphanageDTO';

import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';

class OrphanagesRepository implements IOrphanagesRepository {
  private ormRepository: Repository<Orphanage>;

  constructor() {
    this.ormRepository = getRepository(Orphanage);
  }

  public async findAllNotActive(): Promise<Orphanage[]> {
    const orphanages = await this.ormRepository.find({
      relations: ['images'],
      where: { active: false }
    });

    return orphanages;
  }

  public async findAllActive(): Promise<Orphanage[]> {
    const orphanages = await this.ormRepository.find({
      relations: ['images'],
      where: { active: true }
    });

    return orphanages;
  }

  public async findById({ id }: IFindOrphanageDTO): Promise<Orphanage | undefined> {
    const orphanage = await this.ormRepository.findOne(id, {
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
    active,
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
      active,
      images
    });

    await this.ormRepository.save(orphanage);

    return orphanage;
  }

  public async delete({ orphanage }: IDeleteOrphanageDTO): Promise<Orphanage> {
    const deletedOrphanage = await this.ormRepository.remove(orphanage);

    return deletedOrphanage;
  }

  public async save(orphanage: Orphanage): Promise<Orphanage> {
    return this.ormRepository.save(orphanage);
  }
}

export default OrphanagesRepository;
