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
  employee_id: string;
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
    employee_id,
    images
   }: IRequest): Promise<Orphanage> {

    for(let image of images) {
      await this.storageProvider.saveFile(image.path);
    }
    
    const orphanage = await this.orphanagesRepository.create({
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends,
      active: false,
      employee_id,
      images
    });

    return orphanage;
  }
}

export default CreateOrphanageService;