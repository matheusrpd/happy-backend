import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';
import ICreateDonationService from './ICreateDonationService';
import Donation from '../infra/typeorm/entities/Donation';

interface IRequest {
  user_id: string;
  orphanage_id: string;
  amount: number;
  credit_card_id: string;
}

@injectable()
class CreateDonationService {
  constructor(
    @inject('CreateDonationService')
    private createDonationService: ICreateDonationService,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,
  ) { }

  async execute({
    user_id,
    orphanage_id,
    amount,
    credit_card_id
  }: IRequest): Promise<Donation> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const orphanage = await this.orphanagesRepository.findById({ id: orphanage_id });

    if (!orphanage) {
      throw new AppError('Orphanage not found.', 404);
    }

    const donation = await this.createDonationService.execute({
      user,
      orphanage,
      amount,
      credit_card_id
    });

    return donation;
  }
}

export default CreateDonationService;