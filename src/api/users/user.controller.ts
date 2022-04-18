import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/shared/role.decorator';
import { LoginDTO } from './dto/user.dto';
import { IUser } from './dto/user.response';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/login')
  async login(@Body() body: LoginDTO): Promise<IUser> {
    return this.userService.login(body);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  async list(): Promise<User[]> {
    return this.userService.list();
  }
}
