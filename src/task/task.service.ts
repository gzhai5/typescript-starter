import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Task } from './task.class';

@Injectable()
export class TaskService {
  public tasks: Task[] = [];

  create(taskData: Partial<Task>): Task {
    if (!taskData.title || !taskData.status) {
      throw new BadRequestException('Title and status are required');
    }
    const task = new Task(taskData.title, taskData.status, taskData.description);
    this.tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }
  
  delete(id: number): void {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.tasks.splice(taskIndex, 1);
  }
}
