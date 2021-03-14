import User from '@modules/users/infra/typeorm/entities/User';
import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';

export default interface ICreateCreditCardDTO {
  user: User,
  orphanage: Orphanage,
  amount: number
}