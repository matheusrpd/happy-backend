import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import User from '@modules/users/infra/typeorm/entities/User';

@Entity("credit_card")
class CreditCard {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  number: string;

  @Column()
  cvv: string;

  @Column()
  expiration_date: string;

  @Column()
  holder_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(type => User, user => user.credit_cards)
  user: User;
}

export default CreditCard;