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
      return this.userRepository.update(userId, { refresh_token_hash: refreshTokenHash })
    }
    throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND)
  }

  findAll() {
    return `This action returns all user`;
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        email
      }
    })
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
