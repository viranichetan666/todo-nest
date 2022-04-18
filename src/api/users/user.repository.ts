import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';

export class Userrepository {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) { }

  async login(email: string, password: string): Promise<User> {
    const user = await this.model.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new BadRequestException('Incorrect email or password');
    }
    return user;
  }

  async findById(id: string) {
    return this.model.findById(id);
  }

  async list(): Promise<User[]> {
    return this.model.find();
  }
}
