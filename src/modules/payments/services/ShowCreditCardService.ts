import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreditCardsRepository from '../repositories/ICreditCardsRepository';
import CreditCard from '../infra/typeorm/entities/CreditCard';

interface IRequest {
  id: string;
}

@injectable()
class ShowCreditCardService {
  constructor(
    @inject('CreditCardsRepository')
    private creditCardsRepository: ICreditCardsRepository,
  ) {}

  async execute({ id }: IRequest): Promise<CreditCard> {

    const creditCard = await this.creditCardsRepository.findById(id);

    if (!creditCard) {
      throw new AppError('User not found.', 404);
    }

    return creditCard;
  }
}

export default ShowCreditCardService;