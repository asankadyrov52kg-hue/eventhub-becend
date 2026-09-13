import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/helpers/base.entity';
import { Event } from 'src/events/entities/event.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ unique: true })
  name!: string;
  @OneToMany(() => Event, (event) => event.category)
  events!: Event[];
}
