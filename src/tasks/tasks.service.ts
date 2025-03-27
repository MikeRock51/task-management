import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './entities/task.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dtos/create.dto';
import { FilterTaskDo } from './dtos/filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    readonly entityManager: EntityManager,
  ) {}

  async getTasks(filterTaskDo: FilterTaskDo): Promise<Task[]> {
    const { status, search } = filterTaskDo;
    const query = this.taskRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status: status.toUpperCase() });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search.toLowerCase()}%` },
      );
    }

    return await query.getMany();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task(createTaskDto);
    return await this.entityManager.save(task);
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }

    return task;
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;

    await this.entityManager.save(task);
    return task;
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
