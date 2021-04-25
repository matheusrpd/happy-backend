import { startOfMonth, isBefore } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentService, { IRequest } from './ICreateAppointmentService';

@injectable()
class CreateAppointmentRehabCenterService implements ICreateAppointmentService {
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

    const startMonthDate = startOfMonth(date);

    appointmentsUser?.forEach(findAppointment => {
      if (!isBefore(findAppointment.date, startMonthDate)) {
        throw new AppError('User can only make an appointment per month.');
      }
    });

    const appointment = await this.appointmentsRepository.create({
      organizationId,
      userId,
      date
    });

    return appointment;
  }
}

export default CreateAppointmentRehabCenterService;