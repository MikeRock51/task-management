import { Body, Controller, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        console.log(createTaskDto);
    }
}
