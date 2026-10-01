import { Injectable, ConflictException, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from './entities/registration.entity';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { EventsService } from '../events/events.service';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
    
    @Inject(forwardRef(() => EventsService))
    private readonly eventsService: EventsService,
  ) {}

  async checkExists(userId: string, eventId: string): Promise<boolean> {
    const count = await this.registrationRepository.count({
      where: { userId, eventId },
    });
    return count > 0;
  }

  async create(userId: string, dto: CreateRegistrationDto): Promise<Registration> {
    const isRegistered = await this.checkExists(userId, dto.eventId);
    
    if (isRegistered) {
      throw new ConflictException('Вы уже зарегистрированы на это мероприятие');
    }

    const event = await this.eventsService.findOne(dto.eventId);
    if (!event || event.capacity <= 0) {
      throw new BadRequestException('Свободных мест больше нет');
    }

    const registration = this.registrationRepository.create({
      userId,
      eventId: dto.eventId,
    });

    try {
      const savedRegistration = await this.registrationRepository.save(registration);
      
      await this.eventsService.update(dto.eventId, {
        capacity: event.capacity - 1
      });

      return savedRegistration;
    } catch (error) {
      const dbError = error as { code?: string };

      if (dbError.code === '23505') { 
        throw new ConflictException('Вы уже зарегистрированы на это мероприятие');
      }
      
      throw error;
    }
  }

  async findByUserId(userId: string): Promise<Registration[]> {
    return this.registrationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: string) {
    const registration = await this.registrationRepository.findOne({ where: { id } });
    
    if (!registration) {
      throw new NotFoundException('Регистрация с таким ID не найдена');
    }
    
    const event = await this.eventsService.findOne(registration.eventId);
    
    await this.registrationRepository.remove(registration);
    
    if (event) {
      await this.eventsService.update(registration.eventId, {
        capacity: event.capacity + 1
      });
    }

    return { message: 'Запись успешно отменена' };
  }
}
