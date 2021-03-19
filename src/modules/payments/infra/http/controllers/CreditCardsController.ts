import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCreditCardService from '@modules/payments/services/CreateCreditCardService';
import ShowCreditCardService from '@modules/payments/services/ShowCreditCardService';

export default class CreditCardsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { 
      number, 
      cvv, 
      expiration_date, 
      holder_name 
    } = request.body;

    const { id } = request.user;

    const createCreditCard = container.resolve(CreateCreditCardService);

    const creditCard = await createCreditCard.execute({
      user_id: id,
      number, 
      cvv, 
      expiration_date, 
      holder_name 
    });

    return response.json(classToClass(creditCard));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCreditCard = container.resolve(ShowCreditCardService);

    const creditCard = await showCreditCard.execute({ id })

    return response.json(classToClass(creditCard));
  }
}