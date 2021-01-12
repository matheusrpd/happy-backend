import ICreateOrphanageDTO from '@modules/orphanages/dtos/ICreateOrphanageDTO';
import IFindOrphanageDTO from '@modules/orphanages/dtos/IFindOrphanageDTO';

import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';

export default interface IOrphanagesRepository {
  create(data: ICreateOrphanageDTO): Promise<Orphanage>;
  find(): Promise<Orphanage[]>;
  findById(data: IFindOrphanageDTO): Promise<Orphanage>;
}