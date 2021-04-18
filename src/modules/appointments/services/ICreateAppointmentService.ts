import Appointment from '../infra/typeorm/entities/Appointment';

export interface IRequest {
  organizationId: string;
  userId: string;
  date: Date;
}

export default interface ICreateAppointmentService {
  execute(data: IRequest): Promise<Appointment>;
}