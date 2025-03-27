import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks(): Promise<Task[]> {
        return this.taskService.getAll();
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }

    @Get(':id')
    getTaskById(@Param('id') id: number): Promise<Task> {
        return this.taskService.getTaskById(id);
    }
}
