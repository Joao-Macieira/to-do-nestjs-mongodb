import { Test, TestingModule } from '@nestjs/testing';
import { TaskEntity } from './entity/tasks.model';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { UpdateTaskDto } from './dto/UpdateTaskDto';

const listTask: TaskEntity[] = [
  new TaskEntity({ name: 'teste', done: false }),
  new TaskEntity({ name: 'teste2', done: false }),
  new TaskEntity({ name: 'teste3', done: false }),
];

const newTaskEntity = new TaskEntity({
  name: 'teste',
  done: false,
});

const updateTask = new TaskEntity({ name: 'teste', done: true });

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(listTask),
            create: jest.fn().mockResolvedValue(newTaskEntity),
            findById: jest.fn().mockResolvedValue(listTask[0]),
            update: jest.fn().mockResolvedValue(updateTask),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    taskController = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
  });

  describe('Define modules', () => {
    it('should to be defined', async () => {
      expect(taskController).toBeDefined();
      expect(taskService).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should be return an array of tasks', async () => {
      const result = await taskController.getAll();

      expect(result).toEqual(listTask);
      expect(typeof result).toEqual('object');
      expect(taskService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(taskService, 'findAll').mockRejectedValueOnce(new Error());

      expect(taskController.getAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new task successfully', async () => {
      const task: CreateTaskDto = {
        name: 'teste',
        done: false,
      };

      const result = await taskController.create(task);

      expect(result).toEqual(newTaskEntity);
      expect(taskService.create).toHaveBeenCalledTimes(1);
      expect(taskService.create).toBeCalledWith(task);
    });

    it('should throw an exception', () => {
      const task: CreateTaskDto = {
        name: 'teste',
        done: false,
      };

      jest.spyOn(taskService, 'create').mockRejectedValueOnce(new Error());

      expect(taskController.create(task)).rejects.toThrowError();
    });
  });

  describe('get', () => {
    it('should get a task item successfully', async () => {
      const result = await taskController.get('1');

      expect(result).toEqual(listTask[0]);
      expect(taskService.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(taskService, 'findById').mockRejectedValueOnce(new Error());

      expect(taskController.get('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a todo item successfully', async () => {
      const task: UpdateTaskDto = {
        name: 'teste',
        done: true,
      };

      const result = await taskController.update('1', task);

      expect(result).toEqual(updateTask);
      expect(taskService.update).toHaveBeenCalledTimes(1);
      expect(taskService.update).toHaveBeenCalledWith(undefined, task);
    });

    it('should throw an exception', () => {
      const task: UpdateTaskDto = {
        name: 'teste',
        done: true,
      };

      jest.spyOn(taskService, 'update').mockRejectedValueOnce(new Error());

      expect(taskController.update('1', task)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a task item successfully', async () => {
      const result = await taskController.remove('1');

      expect(result).toEqual(true);
      expect(taskService.remove).toHaveBeenCalledTimes(1);
      expect(taskService.remove).toHaveBeenCalledWith(undefined);
    });

    it('should throw an exception', async () => {
      jest.spyOn(taskService, 'remove').mockRejectedValueOnce(new Error(''));

      expect(taskController.remove('')).rejects.toThrowError();
    });
  });
});
