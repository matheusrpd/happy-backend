import User from '@modules/users/infra/typeorm/entities/User';

export default interface ICreateCreditCardDTO {
  user: User,
  number: string;
  cvv: string;
  expiration_date: string;
  holder_name: string;
}