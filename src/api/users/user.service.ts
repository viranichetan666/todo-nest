import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/user.dto';
import { IUser } from './dto/user.response';
import { User } from './user.entity';
import { Userrepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: Userrepository,
    private readonly jwt: JwtService,
  ) { }

  async login({ email, password }: LoginDTO): Promise<IUser> {
    try {
      const user = await this.userRepo.login(email, password);
      const token = await this.generateToken(user);
      return { user, token };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async list(): Promise<User[]> {
    return this.userRepo.list();
  }

  async generateToken(user: User): Promise<string> {
    return this.jwt.signAsync(
      { id: user._id, email: user.email, role: user.role },
      { expiresIn: '20m' },
    );
  }

  async validateUser({ id }): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
