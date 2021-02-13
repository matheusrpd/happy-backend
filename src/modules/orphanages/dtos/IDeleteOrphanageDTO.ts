import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';

export default interface IDeleteOrphanageDTO {
  orphanage: Orphanage;
}