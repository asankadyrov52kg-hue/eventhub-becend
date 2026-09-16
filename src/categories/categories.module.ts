import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- ПРОВЕРЬ ЭТОТ ИМПОРТ
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity'; // <-- ТВОЯ СУЩНОСТЬ

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]), 
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [TypeOrmModule, CategoriesService], 
})
export class CategoriesModule {}
