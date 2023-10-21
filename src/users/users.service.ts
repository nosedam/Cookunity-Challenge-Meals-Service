import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  create(createUserDto: Partial<CreateUserDto>) {
    return this.userRepository.save(createUserDto);
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({email: email})
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

}


