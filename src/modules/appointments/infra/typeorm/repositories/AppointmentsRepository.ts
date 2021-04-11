import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindByDateDTO from '@modules/appointments/dtos/IFIndByDateDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate({
    organizationId,
    date
  }: IFindByDateDTO): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({
      where: { date, organization_id: organizationId },
    });

    return appointment;
  }

  public async create({
    organizationId,
    userId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      organization_id: organizationId,
      user_id: userId,
      date,
    });

    await this.save(appointment);

    return appointment;
  }

  public async save(appointment: Appointment): Promise<Appointment> {
    return this.ormRepository.save(appointment);
  }
}

export default AppointmentsRepository;
