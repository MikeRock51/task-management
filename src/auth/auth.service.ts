import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(createAuthDto: CreateAuthDto) {
    const user = new User(createAuthDto);
    const salt = bcrypt.genSaltSync();
    user.password = await this.hashPassword(user.password, salt);

    try {
      await this.userRepository.save(user);
      return user;
    } catch(error) {
      if (error.code === '23505') {
        throw new BadRequestException('Username already exists');
      } else {
        throw new InternalServerErrorException('Error creating user');
      }
    }
  }

  async signin(createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await user.validatePassword(password))) {
      const payload = { username };
      const token = this.jwtService.sign(payload);

      return { token };
    } else {
      throw new BadRequestException('Invalid credentials');
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
