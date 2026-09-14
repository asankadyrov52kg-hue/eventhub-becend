import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/helpers/base.entity';
import { Event } from 'src/events/entities/event.entity';
import { Registration } from 'src/registration/entities/registration.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name!: string;

  @Column({ unique: true }) 
  email!: string;

  @Column()
  password_hash!: string;

   @Column({
        nullable: true
    })
    refresh_token_hash!: string;

  @OneToMany(() => Event, (event) => event.user)
  events!: Event[];

  @OneToMany(() => Registration, (registration) => registration.user)
  registrations!: Registration[];
}

