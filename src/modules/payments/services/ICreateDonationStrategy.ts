import Donation from '../infra/typeorm/entities/Donation';
import { IRequest } from './CreateDonationService';

export default interface ICreateDonationStrategy {
  execute(data: IRequest): Promise<Donation>;
}