import { injectable, inject } from 'tsyringe';
import pagarme from 'pagarme';

import AppError from '@shared/errors/AppError';

import ICreateDonationService from './ICreateDonationService';
import IDonationsRepository from '../repositories/IDonationsRepository';

import Donation from '../infra/typeorm/entities/Donation';
import { IRequest } from './ICreateDonationService';

@injectable()
class CreateDonationTicketRestrictedService implements ICreateDonationService {
  constructor(
    @inject('DonationsRepository')
    private donationsRepository: IDonationsRepository,
  ) { }

  async execute({
    user,
    orphanage,
    amount: amountClient
  }: IRequest): Promise<Donation> {
    if (amountClient < 500) {
      throw new AppError('Minimum donation amount is 500 reais.');
    }

    const clientPagarme = await pagarme.client.connect({
      api_key: 'ak_test_YGwKqEp4XVrQIuTt9anOLCzheD5JZJ'
    });

    const amount = amountClient * 100;

    const payload = {
      "amount": amount,
      "payment_method": 'boleto',
      "customer": {
        "type": 'individual',
        "country": "br",
        "name": user.name,
        "documents": [
          {
            "type": 'cpf',
            "number": user.cpf,
          },
        ],
      },
    }

    try {
      const response = await clientPagarme.transactions.create(payload);
      console.log(response);
    } catch (error) {
      console.error(error.response);
      throw new AppError('Donation fail.');
    }

    const donation = await this.donationsRepository.create({
      user,
      orphanage,
      amount: amountClient
    });

    return donation;
  }
}

export default CreateDonationTicketRestrictedService;