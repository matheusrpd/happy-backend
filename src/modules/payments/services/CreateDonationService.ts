import { injectable, inject } from 'tsyringe';

import ICreateDonationService, { IRequest } from './ICreateDonationService';
import Donation from '../infra/typeorm/entities/Donation';

@injectable()
class CreateDonationService {
  constructor(
    @inject('CreateDonationService')
    private createDonationService: ICreateDonationService,
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