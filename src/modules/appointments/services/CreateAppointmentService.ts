import { injectable, inject } from 'tsyringe';
import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentService, { IRequest } from './ICreateAppointmentService';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('CreateAppointmentService')
    private createAppointmentService: ICreateAppointmentService,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('OrphanagesRepository')
    private orphanagesRepository: IOrphanagesRepository,

    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({
    organizationId,
    userId,
    date,
  }: IRequest): Promise<Appointment> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const orphanage = await this.orphanagesRepository.findById({ id: organizationId });

    if (!orphanage) {
      throw new AppError('Orphanage not found.', 404);
    }

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate({
      organizationId,
      userId,
      date: appointmentDate
    });

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.');
    }

    const appointment = await this.createAppointmentService.execute({
      organizationId,
      userId,
      date: appointmentDate
    });

    return appointment;
  }
}

export default CreateAppointmentService;