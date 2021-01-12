import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';

import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';

interface Image {
  path: string;
}

interface IRequest {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string,
  opening_hours: string;
  open_on_weekends: boolean;
  images: Image[];
}

@injectable()
class CreateOrphanageService {

  constructor (
    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ){}

  public async execute({
    name, 
    latitude, 
    longitude, 
    about, 
    instructions, 
    opening_hours, 
    open_on_weekends,
    images
   }: IRequest): Promise<Orphanage> {

    const orphanage = await this.orphanagesRepository.create({
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends,
      images
    });

    return orphanage;
  }
}

export default CreateOrphanageService;