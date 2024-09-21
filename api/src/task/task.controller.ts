import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './schema/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Get()
    async findAll(@Req() req): Promise<Task[]> {
        return this.taskService.findAll(req.user);
    }


    @Get(':id')
    async findById(@Param('id') id: string, @Req() req): Promise<Task> {
        return this.taskService.findById(id, req.user);
    }

    @Post('create_task')
    async createTask(@Body() task: CreateTaskDto, @Req() req): Promise<Task> {
        return this.taskService.create(task, req.user);
    }

    @Put(':id')
    async updateTask(
        @Param('id') id: string,
        @Body() task: CreateTaskDto,
        @Req() req,
    ): Promise<Task> {
        return this.taskService.update(id, task, req.user);
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string, @Req() req): Promise<Task> {
        return this.taskService.delete(id, req.user);
    }
}
