import { startOfWeek, isBefore } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentService, { IRequest } from './ICreateAppointmentService';

@injectable()
class CreateAppointmentOrphanageService implements ICreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({
    organizationId,
    userId,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentsUser = await this.appointmentsRepository.findByUser({ userId });

    const startWeekDate = startOfWeek(date);
    let qtdsAppointments = 0;

    appointmentsUser?.forEach(findAppointment => {
      if (!isBefore(findAppointment.date, startWeekDate)) {
        qtdsAppointments++;
      }
    });

    if (qtdsAppointments >= 2) {
      throw new AppError('The user can only make two consultations per week.');
    }

    const appointment = await this.appointmentsRepository.create({
      organizationId,
      userId,
      date
    });

    return appointment;
  }
}

export default CreateAppointmentOrphanageService;