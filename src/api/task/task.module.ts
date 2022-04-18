import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task.controller';

import { Task, TaskSchema } from './task.entity';
import { Taskrepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TaskController],
  providers: [TaskService, Taskrepository],
  exports: [TaskService],
})
export class TaskModule { }
