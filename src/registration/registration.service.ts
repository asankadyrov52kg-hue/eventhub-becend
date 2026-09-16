import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from './entities/registration.entity';
import { CreateRegistrationDto } from './dto/create-registration.dto';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
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

    const registration = this.registrationRepository.create({
      userId,
      eventId: dto.eventId,
    });

    try {
  return await this.registrationRepository.save(registration);
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
}
