import { IsOptional } from "class-validator";
import { TaskStatus } from "../entities/task.entity";

export class FilterTaskDo {
    @IsOptional()
    status: TaskStatus;

    @IsOptional()
    search: string;
}