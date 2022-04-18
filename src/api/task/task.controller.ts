import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserGuard } from 'src/shared/auth.guard';
import { Roles } from 'src/shared/role.decorator';
import { UserInfo } from 'src/shared/user.decorator';
import { User } from '../users/user.entity';
import { CreateTaskDTO } from './dto/task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async list(@UserInfo() info: User): Promise<Task[]> {
    return this.taskService.list(info);
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() body: CreateTaskDTO,
    @UserInfo() info: User,
  ): Promise<Task> {
    return this.taskService.create(body, info._id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() body: CreateTaskDTO,
  ): Promise<Task> {
    return this.taskService.update(id, body);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string): Promise<Task> {
    return this.taskService.remove(id);
  }

  @Put('/assign-task/:id')
  @Roles('admin')
  @UseGuards(UserGuard)
  async assignTask(
    @Param('id') id: string,
    @Body('user') user: string,
  ): Promise<Task> {
    return this.taskService.assignTask(id, user);
  }

  @Post('/bulk-upload')
  @Roles('admin')
  @UseGuards(UserGuard)
  @UseInterceptors(FileInterceptor('tasks'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.taskService.bulkUploadTasks(file.buffer);
  }
}
