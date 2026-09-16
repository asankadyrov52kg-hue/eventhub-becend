import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // 1. Получение списка всех категорий (по алфавиту)
  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      order: { name: 'ASC' },
    });
  }

  // 2. Метод для создания (пригодится, чтобы наполнить базу через Postman)
  async create(name: string): Promise<Category> {
    const category = this.categoryRepository.create({ name });
    try {
      return await this.categoryRepository.save(category);
    } catch (error) {
      if ((error as any).code === '23505') { // Твоя любимая ошибка уникальности :)
        throw new ConflictException('Такая категория уже существует');
      }
      throw error;
    }
  }
}
