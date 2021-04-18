import Donation from '../infra/typeorm/entities/Donation';

export interface IRequest {
  user_id: string;
  orphanage_id: string;
  amount: number;
  credit_card_id: string;
}

export default interface ICreateDonationService {
  execute(data: IRequest): Promise<Donation>;
}