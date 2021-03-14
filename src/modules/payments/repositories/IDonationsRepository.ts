import Donation from '../infra/typeorm/entities/Donation';
import ICreateDonationDTO from '../dtos/ICreateDonationDTO';

export default interface IDonationsRepository {
  findById(id: string): Promise<Donation | undefined>;
  create(data: ICreateDonationDTO): Promise<Donation>;
  save(donation: Donation): Promise<Donation>;
}