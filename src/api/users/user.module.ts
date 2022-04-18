import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from '../../shared/jwt.strategy';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.entity';
import { Userrepository } from './user.repository';
import { UserService } from './user.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'mysupersecret',
      signOptions: { expiresIn: '20m' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, Userrepository, JwtStrategy],
  exports: [UserService],
})
export class UserModule { }
