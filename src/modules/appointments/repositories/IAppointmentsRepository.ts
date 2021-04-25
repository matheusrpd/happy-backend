import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFIndByDateDTO from '@modules/appointments/dtos/IFIndByDateDTO';
import IFIndByUserDTO from '@modules/appointments/dtos/IFIndByUserDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(data: IFIndByDateDTO): Promise<Appointment | undefined>;
  findByUser(data: IFIndByUserDTO): Promise<Appointment[] | undefined>;
  save(appointment: Appointment): Promise<Appointment>;
}