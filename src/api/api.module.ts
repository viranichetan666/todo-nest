import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [UserModule, TaskModule],
  exports: [UserModule, TaskModule],
})
export class ApiModule { }
