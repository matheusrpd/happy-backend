import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindByDateDTO from '@modules/appointments/dtos/IFIndByDateDTO';
import IFindByUserDTO from '@modules/appointments/dtos/IFIndByUserDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate({
    organizationId,
    userId,
    date
  }: IFindByDateDTO): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({
      where: { date, organization_id: organizationId, user_id: userId },
    });

    return appointment;
  }

  public async findByUser({
    userId,
  }: IFindByUserDTO): Promise<Appointment[] | undefined> {
    const appointments = await this.ormRepository.find({
      where: { user_id: userId },
    });

    return appointments;
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
