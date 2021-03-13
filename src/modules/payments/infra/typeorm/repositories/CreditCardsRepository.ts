import { getRepository, Repository, Not } from 'typeorm';

import ICreditCardsRepository from '@modules/payments/repositories/ICreditCardsRepository';
import ICreateCreditCardDTO from '@modules/payments/dtos/ICreateCreditCardDTO';

import CreditCard from '../entities/CreditCard';

class CreditCardsRepository implements ICreditCardsRepository {
  private ormRepository: Repository<CreditCard>;

  constructor() {
    this.ormRepository = getRepository(CreditCard);
  }

  public async findById(id: string): Promise<CreditCard | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async create({
    user,
    number,
    cvv,
    expiration_date,
    holder_name,
  }: ICreateCreditCardDTO): Promise<CreditCard> {

    const creditCard = this.ormRepository.create({ 
      user,
      number,
      cvv,
      expiration_date,
      holder_name,
    });

    await this.save(creditCard);

    return creditCard;
  }

  public async save(creditCard: CreditCard): Promise<CreditCard> {
    return this.ormRepository.save(creditCard);
  }
}

export default CreditCardsRepository;