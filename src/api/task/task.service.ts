import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';

import { User } from '../users/user.entity';
import { CreateTaskDTO } from './dto/task.dto';
import { Task } from './task.entity';
import { Taskrepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepo: Taskrepository) { }

  async list(user: User): Promise<Task[]> {
    if (user.role === 'admin') {
      return this.taskRepo.findAll();
    }
    return this.taskRepo.findAllUserTask(user._id);
  }

  async create(body: CreateTaskDTO, user: string): Promise<Task> {
    return this.taskRepo.create(body, user);
  }

  async update(id: string, body: CreateTaskDTO): Promise<Task> {
    return this.taskRepo.update(id, body);
  }

  async remove(id: string): Promise<Task> {
    return this.taskRepo.remove(id);
  }

  async assignTask(id: string, user: string): Promise<Task> {
    return this.taskRepo.assignUser(id, user);
  }

  async bulkUploadTasks(file: Buffer): Promise<any> {
    const data = await xlsx.read(file, { type: 'buffer', cellDates: true });
    const sheet_name_list = data.SheetNames;
    const jsondata = xlsx.utils.sheet_to_json(data.Sheets[sheet_name_list[0]]);
    return this.taskRepo.bulkInsertTask(jsondata);
  }
}
