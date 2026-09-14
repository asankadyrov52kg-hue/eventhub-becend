import { 
  Entity,PrimaryGeneratedColumn, 
  Column,CreateDateColumn,ManyToOne,JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Event } from 'src/events/entities/event.entity';

@Entity('registrations')
export class Registration {
  
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ type: 'uuid' }) 
  userId!: string;
  @Column({ type: 'uuid' })
  eventId!: string;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) 
  user!: User;
  @ManyToOne(() => Event, (event) => event.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventId' }) 
  event!: Event;
}

