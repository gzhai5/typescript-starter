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

  // test 1: Create a new task
  describe('create', () => {
    it('should create a new task', async () => {
      const taskData: Partial<Task> = { title: 'Task 1', status: 'TODO' };
      const createdTask = await taskService.create(taskData);
  
      expect(createdTask.title).toEqual(taskData.title);
      expect(createdTask.status).toEqual(taskData.status);
      expect(taskService.tasks).toContain(createdTask);
    });
  });
  
  // test 2: Retrieve a task by its id
  describe('findOne', () => {
    it('should find a task by id', async () => {
      const task = new Task('Task 1', 'TODO');
  
      taskService.tasks = [task];
      const result = await taskService.findOne(task.id);  
      expect(result).toEqual(task);
    });
  });

  // task 3: Delete a task by its id
  describe('delete', () => {
    it('should delete a task by id', async () => {
      const task = new Task('Task 1', 'TODO');
      task.id = 1;
  
      taskService.tasks = [task];
      await taskService.delete(1); 
      expect(taskService.tasks).toHaveLength(0);
    });
  });
});
