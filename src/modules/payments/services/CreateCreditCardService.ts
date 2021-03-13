import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreditCardsRepository from '../repositories/ICreditCardsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import CreditCard from '../infra/typeorm/entities/CreditCard';

interface IRequest {
  user_id: string;
  number: string;
  cvv: string;
  expiration_date: string;
  holder_name: string;
}

@injectable()
class CreateCreditCardService {
  constructor(
    @inject('CreditCardsRepository')
    private creditCardsRepository: ICreditCardsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ 
    user_id,
    number, 
    cvv, 
    expiration_date,
    holder_name,
  }: IRequest): Promise<CreditCard> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }
    
    const creditCard = await this.creditCardsRepository.create({
      user,
      number, 
      cvv, 
      expiration_date,
      holder_name,
    });

    return creditCard;
  }
}

export default CreateCreditCardService;