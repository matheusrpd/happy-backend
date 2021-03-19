import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

import Orphanage from '../infra/typeorm/entities/Orphanage';

interface Image {
  path: string;
}

interface IRequest {
  id: string,
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string,
  opening_hours: string;
  open_on_weekends: boolean;
  active: boolean,
  images: Image[];
}

@injectable()
class UpdateOrphanageService {
  constructor(
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({
    id,
    name, 
    latitude, 
    longitude, 
    about, 
    instructions, 
    opening_hours, 
    open_on_weekends,
    active,
    images
  }: IRequest): Promise<Orphanage> {
    const orphanage = await this.orphanagesRepository.findById({ id });

    if (!orphanage) {
      throw new AppError('Orphanage not found.', 404);
    }

    orphanage.name = name;
    orphanage.latitude = latitude;
    orphanage.longitude = longitude;
    orphanage.about = about; 
    orphanage.instructions = instructions; 
    orphanage.opening_hours = opening_hours; 
    orphanage.open_on_weekends = open_on_weekends;
    orphanage.active = active;

    return this.orphanagesRepository.save(orphanage);
  }
}

export default UpdateOrphanageService;