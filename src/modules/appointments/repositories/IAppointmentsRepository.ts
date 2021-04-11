import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFIndByDateDTO from '@modules/appointments/dtos/IFIndByDateDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(data: IFIndByDateDTO): Promise<Appointment | undefined>;
  save(appointment: Appointment): Promise<Appointment>;
}