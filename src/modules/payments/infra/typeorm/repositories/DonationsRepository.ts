import { getRepository, Repository } from 'typeorm';

import IDonationsRepository from '@modules/payments/repositories/IDonationsRepository';
import ICreateDonationDTO from '@modules/payments/dtos/ICreateDonationDTO';

import Donation from '../entities/Donation';

class DonationsRepository implements IDonationsRepository {
  private ormRepository: Repository<Donation>;

  constructor() {
    this.ormRepository = getRepository(Donation);
  }

  public async findById(id: string): Promise<Donation | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async create({
    user,
    orphanage,
    amount
  }: ICreateDonationDTO): Promise<Donation> {

    const donation = this.ormRepository.create({ 
      user,
      orphanage,
      amount
    });

    await this.save(donation);

    return donation;
  }

  public async save(donation: Donation): Promise<Donation> {
    return this.ormRepository.save(donation);
  }
}

export default DonationsRepository;