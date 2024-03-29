import { injectable, inject } from 'tsyringe';
import pagarme from 'pagarme';

import AppError from '@shared/errors/AppError';

import ICreateDonationService from './ICreateDonationService';
import IDonationsRepository from '../repositories/IDonationsRepository';
import ICreditCardsRepository from '../repositories/ICreditCardsRepository';

import Donation from '../infra/typeorm/entities/Donation';
import { IRequest } from './ICreateDonationService';

@injectable()
class CreateDonationCreditCardService implements ICreateDonationService {
  constructor(
    @inject('DonationsRepository')
    private donationsRepository: IDonationsRepository,

    @inject('CreditCardsRepository')
    private creditCardsRepository: ICreditCardsRepository,
  ) { }

  async execute({
    user,
    orphanage,
    amount: amountClient,
    credit_card_id
  }: IRequest): Promise<Donation> {
    const creditCard = await this.creditCardsRepository.findById(credit_card_id);

    if (!creditCard) {
      throw new AppError('Credit card not found.', 404);
    }

    if (creditCard.user.id !== user.id) {
      throw new AppError('Credit card does not belong to the user.');
    }

    const clientPagarme = await pagarme.client.connect({
      api_key: 'ak_test_YGwKqEp4XVrQIuTt9anOLCzheD5JZJ'
    });

    const amount = amountClient * 100;

    const payload = {
      "amount": amount,
      "card_number": creditCard.number,
      "card_cvv": creditCard.cvv,
      "card_expiration_date": creditCard.expiration_date,
      "card_holder_name": creditCard.holder_name,
      "customer": {
        "external_id": "#3311",
        "name": user.name,
        "type": "individual",
        "country": "br",
        "email": user.email,
        "documents": [
          {
            "type": "cpf",
            "number": user.cpf
          }
        ],
        "phone_numbers": [`+55${user.phone_number}`],
      },
      "billing": {
        "name": user.name,
        "address": {
          "country": "br",
          "state": user.state,
          "city": user.city,
          "neighborhood": user.neighborhood,
          "street": user.street,
          "street_number": user.street_number,
          "zipcode": user.zipcode
        }
      },
      "items": [
        {
          "id": String(orphanage.id),
          "title": orphanage.name,
          "unit_price": amount,
          "quantity": 1,
          "tangible": true
        },
      ]
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

export default CreateDonationCreditCardService;