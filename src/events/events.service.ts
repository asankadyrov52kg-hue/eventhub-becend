import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto, userId: string): Promise<Event> {
    const newEvent = this.eventRepository.create({
      ...createEventDto,
      userId,
    });
    return await this.eventRepository.save(newEvent);
  }

//   async findAll(): Promise<Event[]> {
//   return await this.eventRepository.find({
//     relations: {
//       category: true,
//     },
//     order: { date: 'ASC' },
//   });
// }
async findAll(categoryId?: string): Promise<Event[]> {
  return await this.eventRepository.find({
    where: categoryId ? { categoryId } : {},
    relations: {
      category: true,
    },
    order: { date: 'ASC' },
  });
}

async findOne(id: string): Promise<Event> {
  const event = await this.eventRepository.findOne({
    where: { id },
    relations: {
      category: true,
      user: true,
    },
  });

  if (!event) {
    throw new NotFoundException(`Мероприятие с ID ${id} не найдено`);
  }

  return event;
}

 

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id);
    const updatedEvent = this.eventRepository.merge(event, updateEventDto);
    return await this.eventRepository.save(updatedEvent);
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const event = await this.findOne(id);
    await this.eventRepository.remove(event);
    return { deleted: true };
  }
}
