import ICreateOrphanageDTO from '@modules/orphanages/dtos/ICreateOrphanageDTO';
import IDeleteOrphanageDTO from '@modules/orphanages/dtos/IDeleteOrphanageDTO';
import IFindOrphanageDTO from '@modules/orphanages/dtos/IFindOrphanageDTO';

import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';

export default interface IOrphanagesRepository {
  create(data: ICreateOrphanageDTO): Promise<Orphanage>;
  findAllNotActive(): Promise<Orphanage[]>;
  findAllActive(): Promise<Orphanage[]>;
  findById(data: IFindOrphanageDTO): Promise<Orphanage | undefined>;
  delete(data: IDeleteOrphanageDTO): Promise<Orphanage>;
  save(orphanage: Orphanage): Promise<Orphanage>;
}