import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateDonationService from '@modules/payments/services/CreateDonationService';

export default class DonationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      orphanage_id,
      credit_card_id,
      amount
    } = request.body;

    const { id } = request.user;

    const createDonation = container.resolve(CreateDonationService);

    const donation = await createDonation.execute({
      user_id: id,
      orphanage_id,
      credit_card_id,
      amount,
    });

    return response.json(classToClass(donation));
  }
}