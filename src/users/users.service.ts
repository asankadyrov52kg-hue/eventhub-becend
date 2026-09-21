import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const exist = await this.findUserByEmail(createUserDto.email)
    if (!exist) {
      return this.userRepository.save({ ...createUserDto })
    }
    throw new HttpException("Пользователь уже существует", HttpStatus.BAD_REQUEST)
  }

  async updateRefreshToken(userId: string, refreshTokenHash?: string) {
    const existUser = await this.findOne(userId)
    if (existUser) {
  
      await this.userRepository.update(userId, { refresh_token_hash: refreshTokenHash })
      return;
    }
    throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND)
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email }
    })
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id })
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }
    
    const updatedUser = this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }
  async remove(id: string): Promise<{ deleted: boolean }> {
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }
    
    await this.userRepository.remove(user);
    return { deleted: true };
  }
}
