import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDTO } from './dto/task.dto';

import { Task } from './task.entity';

export class Taskrepository {
  constructor(@InjectModel(Task.name) private readonly model: Model<Task>) { }

  async findAllUserTask(id): Promise<Task[]> {
    return this.model.find({ user: id });
  }

  async findAll(): Promise<Task[]> {
    return this.model.find();
  }

  async create(body: CreateTaskDTO, user: string): Promise<Task> {
    return this.model.create({ ...body, user });
  }

  async update(id: string, body: CreateTaskDTO): Promise<Task> {
    return this.model.findByIdAndUpdate(id, { $set: body }, { new: true });
  }

  async remove(id: string): Promise<Task> {
    return this.model.findByIdAndRemove(id);
  }

  async assignUser(taskId: string, userId: string): Promise<Task> {
    return this.model.findByIdAndUpdate(
      taskId,
      { $set: { user: userId } },
      { new: true },
    );
  }

  async bulkInsertTask(task: Record<string, any>[]): Promise<Task[]> {
    return this.model.insertMany(task);
  }
}
