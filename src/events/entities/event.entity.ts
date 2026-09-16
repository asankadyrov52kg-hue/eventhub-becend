import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/helpers/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Registration } from 'src/registration/entities/registration.entity';

@Entity('events')
export class Event extends BaseEntity {
  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({type:'timestamp'})
  date!: Date;

  @Column()
  address!: string;

  @Column({ type: 'int', default: 0 })
  price!: number;

  @Column({ type: 'int' })
  capacity!: number;

  @Column({type:'varchar', nullable: true })
  image?: string | null; 


  @ManyToOne(() => User, (user) => user.events, { onDelete: 'CASCADE' })
  user!: User;

  @Column()
  userId!: string;

  @ManyToOne(() => Category, (category) => category.events, { onDelete: 'RESTRICT' })
  category!: Category;

  @Column({nullable:true})
  categoryId?: string | null;

  @OneToMany(() => Registration, (registration) => registration.event)
  registrations!: Registration[];
}

