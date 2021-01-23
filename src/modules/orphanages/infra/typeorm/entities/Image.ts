import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import Orphanage from "./Orphanage";

import { Exclude, Expose } from 'class-transformer';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Exclude()
  path: string;

  @ManyToOne(() => Orphanage, orphanage => orphanage.images)
  @JoinColumn({ name: 'orphanage_id' })
  orphanage: Orphanage;

  @Expose({ name: 'url' })
  getAvatarUrl(): string | null {
    return this.path
      ? `http://localhost:3333/files/${this.path}`
      : null;
  }
}