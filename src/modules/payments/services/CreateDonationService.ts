import { injectable, inject } from 'tsyringe';

import ICreateDonationStrategy from './ICreateDonationStrategy';
import Donation from '../infra/typeorm/entities/Donation';

export interface IRequest {
  user_id: string;
  orphanage_id: string;
  amount: number;
  credit_card_id: string;
}

@injectable()
class CreateDonationService {
  constructor(
    @inject('CreateDonationService')
    private createDonationService: ICreateDonationStrategy,
  ) {}

  async execute({ 
    user_id,
    orphanage_id,
    amount,
    credit_card_id
  }: IRequest): Promise<Donation> {

    const donation = await this.createDonationService.execute({
      user_id,
      orphanage_id,
      amount,
      credit_card_id
    });

    return donation;
  }
}

export default CreateDonationService;