import { Injectable } from '@nestjs/common';
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

    getAll() {
        return this.taskRepository.find();
    }

    async createTask(createTaskDto: CreateTaskDto) {
        const task = new Task(createTaskDto);
        return await this.entityManager.save(task);
    }

}
