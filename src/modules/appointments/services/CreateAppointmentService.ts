import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentService, { IRequest } from './ICreateAppointmentService';

@injectable()
class CreateAppointmentService {
  constructor (
    @inject('CreateAppointmentService')
    private createAppointmentService: ICreateAppointmentService,
  ){}

  public async execute({
    organizationId,
    userId,
    date,
   }: IRequest): Promise<Appointment> {
    const appointment = await this.createAppointmentService.execute({
      organizationId,
      userId,
      date
    });

    return appointment;
  }
}

export default CreateAppointmentService;