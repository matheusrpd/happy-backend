import CreditCard from '../infra/typeorm/entities/CreditCard';
import ICreateCreditCardDTO from '../dtos/ICreateCreditCardDTO';

export default interface ICreditCardsRepository {
  findById(id: string): Promise<CreditCard | undefined>;
  create(data: ICreateCreditCardDTO): Promise<CreditCard>;
  save(creditCard: CreditCard): Promise<CreditCard>;
}