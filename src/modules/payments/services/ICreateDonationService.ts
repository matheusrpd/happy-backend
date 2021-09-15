import Donation from '../infra/typeorm/entities/Donation';
import User from '@modules/users/infra/typeorm/entities/User';
import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';

export interface IRequest {
  user: User;
  orphanage: Orphanage;
  amount: number;
  credit_card_id: string;
}

export default interface ICreateDonationService {
  execute(data: IRequest): Promise<Donation>;
}