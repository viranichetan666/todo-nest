import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { Task, TaskSchema } from './task.entity';
import { Taskrepository } from './task.repository';
import { TaskService } from './task.service';

describe('Task Service', () => {
  let taskService: TaskService;
  let taskRepo: Taskrepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          inject: [ConfigService],
          useFactory: async (config: ConfigService) => {
            return config.getMongoConfig();
          },
        }),
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
        ConfigModule,
      ],
      controllers: [],
      providers: [TaskService, Taskrepository],
    }).compile();
    taskService = module.get<TaskService>(TaskService);
    taskRepo = module.get<Taskrepository>(Taskrepository);
  });

  describe('Repo Create Task', () => {
    it('it should create task', async () => {
      const date = new Date('2022-07-19');
      const result: any = {
        _id: '625914502f4aaf3424597a58',
        title: 'Name of user',
        status: 'completed',
        dueDate: date,
        user: '625914502f4aaf3424597a58',
      };
      jest.spyOn(taskRepo, 'create').mockImplementation(async () => result);
      const createTask = await taskService.create(
        {
          title: 'Name of user',
          status: 'completed',
          dueDate: date,
        },
        '625914502f4aaf3424597a58',
      );
      expect(createTask).toBe(result);
    });
  });

  describe('Repo update Task', () => {
    it('it should create task', async () => {
      const date = new Date('2022-07-19');
      const result: any = {
        _id: '625914502f4aaf3424597a58',
        title: 'Updated result',
        status: 'pending',
        dueDate: date,
        user: '625914502f4aaf3424597a58',
      };
      jest.spyOn(taskRepo, 'update').mockImplementation(async () => result);
      const createTask = await taskService.update('625914502f4aaf3424597a58', {
        title: 'Updated result',
        status: 'pending',
        dueDate: date,
      });
      expect(createTask).toBe(result);
    });
  });

  describe('Repo delete Task', () => {
    it('it should create task', async () => {
      const date = new Date('2022-07-19');
      const result: any = {
        _id: '625914502f4aaf3424597a58',
        title: 'Updated result',
        status: 'pending',
        dueDate: date,
        user: '625914502f4aaf3424597a58',
      };
      jest.spyOn(taskRepo, 'remove').mockImplementation(async () => result);
      const createTask = await taskService.remove('625914502f4aaf3424597a58');
      expect(createTask).toBe(result);
    });
  });

  describe('Repo list all Task', () => {
    it('it should create task', async () => {
      const date = new Date('2022-07-19');
      const result: any[] = [
        {
          _id: '625914502f4aaf3424597a58',
          title: 'Updated result',
          status: 'pending',
          dueDate: date,
          user: '625914502f4aaf3424597a58',
        },
      ];
      jest.spyOn(taskRepo, 'findAll').mockImplementation(async () => result);
      const createTask = await taskService.list('625914502f4aaf3424597a58');
      expect(createTask).toBe(result);
    });
  });
});
