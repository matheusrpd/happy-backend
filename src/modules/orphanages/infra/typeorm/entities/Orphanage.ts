import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  OneToMany, 
  JoinColumn, 
  ManyToOne 
} from 'typeorm';

import Image from './Image';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column({ type: 'boolean', default: false })
  open_on_weekends: boolean;

  @Column({ type: 'boolean', default: false })
  active: boolean;

  @Column()
  employee_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'employee_id' })
  employee: User;

  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert', 'update', 'remove']
  })
  @JoinColumn({ name: 'orphanage_id' })
  images: Image[];
}