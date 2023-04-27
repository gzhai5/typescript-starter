import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    async create(@Body() task: Task): Promise<Task> {
        return this.taskService.create(task);
    }

    @Get()
    async findAll(): Promise<Task[]> {
        return this.taskService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Task> {
        return this.taskService.findOne(Number(id));
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string): Promise<void> {
        await this.taskService.delete(Number(id));
    }
}
