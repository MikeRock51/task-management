import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../entities/task.entity";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = Object.keys(TaskStatus);

    transform(value: any) {
        if (!value) {
            throw new BadRequestException('Status is required');
        }
        
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        return this.allowedStatuses.includes(status);
    }
}