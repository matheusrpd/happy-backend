import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';

import ICreateAppointmentService, { IRequest } from './ICreateAppointmentService';

@injectable()
class CreateAppointmentOrphanageService implements ICreateAppointmentService {
  constructor (
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,
  ){}

  public async execute({
    organizationId,
    userId,
    date,
   }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const orphanage = await this.orphanagesRepository.findById({ id: organizationId });

    if (!orphanage) {
      throw new AppError('Orphanage not found.', 404);
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate({
      organizationId,
      date: appointmentDate
    });

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.');
    }
    
    const appointment = await this.appointmentsRepository.create({
      organizationId,
      userId,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentOrphanageService;