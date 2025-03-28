import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create.dto';
import { Task, TaskStatus } from './entities/task.entity';
import { TaskStatusValidationPipe } from './pipes/taskStatus.pipe';
import { FilterTaskDo } from './dtos/filter.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterTaskDo: FilterTaskDo): Promise<Task[]> {
    return this.taskService.getTasks(filterTaskDo);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get(':id')
  getTaskById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
