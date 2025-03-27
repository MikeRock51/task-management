import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dtos/create.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        readonly entityManager: EntityManager
    ) {}

    getAll(): Promise<Task[]> {
        return this.taskRepository.find();
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

}
