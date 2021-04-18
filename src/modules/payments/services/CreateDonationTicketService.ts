import { injectable, inject } from 'tsyringe';
import pagarme from 'pagarme';

import AppError from '@shared/errors/AppError';

import ICreateDonationService from './ICreateDonationService';
import IDonationsRepository from '../repositories/IDonationsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';

import Donation from '../infra/typeorm/entities/Donation';
import { IRequest } from './ICreateDonationService';

@injectable()
class CreateDonationTicketService implements ICreateDonationService {
  constructor(
    @inject('DonationsRepository')
    private donationsRepository: IDonationsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,
  ) {}

  async execute({ 
    user_id,
    orphanage_id,
    amount: amountClient
  }: IRequest): Promise<Donation> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const orphanage = await this.orphanagesRepository.findById({ id: orphanage_id });

    if (!orphanage) {
      throw new AppError('Orphanage not found.', 404);
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
      await clientPagarme.transactions.create(payload);
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

export default CreateDonationTicketService;