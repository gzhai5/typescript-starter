import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskService } from './task/task.service'
import { Task } from './task/task.class'
import { Repository } from 'typeorm';

describe('TaskController (e2e)', () => {
  let taskService: TaskService;
  let taskRepository: Repository<Task>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    taskService = moduleRef.get<TaskService>(TaskService);
    taskRepository = moduleRef.get<Repository<Task>>(getRepositoryToken(Task));
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const task = new Task('Task 1', 'TODO');
      task.id = 1;
      task.title = 'Task 1';
      task.description = 'Description 1';
      task.status = 'TODO';
      task.createdAt = new Date('2023-04-26T10:00:00Z');
      task.updatedAt = new Date('2023-04-26T10:00:00Z'); 
      const savedTask = new Task('Task 1', 'TODO');
      task.id = 1;
      task.title = 'Task 1';
      task.description = 'Description 1';
      task.status = 'TODO';
      task.createdAt = new Date('2023-04-26T10:00:00Z');
      task.updatedAt = new Date('2023-04-26T10:00:00Z');

      jest.spyOn(taskRepository, 'save').mockResolvedValueOnce(savedTask);

      const result = await taskService.create(task);

      expect(result).toEqual(savedTask);
    });
  });
  
  describe('findOne', () => {
    it('should find a task by id', async () => {
      const task = new Task('Task 1', 'TODO');
      task.id = 1;
      task.title = 'Task 1';
      task.description = 'Description 1';
      task.status = 'TODO';
      task.createdAt = new Date('2023-04-26T10:00:00Z');
      task.updatedAt = new Date('2023-04-26T10:00:00Z');

      jest.spyOn(taskRepository, 'findOne').mockResolvedValueOnce(task);

      const result = await taskService.findOne(1);

      expect(result).toEqual(task);
    });
  });

  describe('delete', () => {
    it('should delete a task by id', async () => {
      const task = new Task('Task 1', 'TODO');
      task.id = 1;
      task.title = 'Task 1';
      task.description = 'Description 1';
      task.status = 'TODO';
      task.createdAt = new Date('2023-04-26T10:00:00Z');
      task.updatedAt = new Date('2023-04-26T10:00:00Z');
  
      jest.spyOn(taskRepository, 'findOne').mockResolvedValueOnce(task);
      jest.spyOn(taskRepository, 'delete').mockResolvedValueOnce({ affected: 1, raw: [] });
  
      await taskService.delete(1);
  
      expect(taskRepository.findOne).toHaveBeenCalledTimes(1);
      expect(taskRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(taskRepository.delete).toHaveBeenCalledTimes(1);
      expect(taskRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
