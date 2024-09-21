import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schema/task.schema';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

    async findAll(user: User): Promise<Task[]> {
        const tasks = await this.taskModel.find({ user: user._id });
        return tasks;
    }

    async findById(id: string, user: User): Promise<Task> {
        const task = await this.taskModel.findOne({ _id: id, user: user._id });
        if (!task) {
            throw new NotFoundException('Task not found or you do not have access');
        }
        return task;
    }

    async create(task: Task, user: User): Promise<Task> {
        const data = Object.assign(task, { user: user._id });

        const newTask = new this.taskModel(task);
        return newTask.save();
    }

    async update(id: string, task: Task, user: User): Promise<Task> {
        const updatedTask = await this.taskModel.findOneAndUpdate(
            { _id: id, user: user._id },
            task,
            { new: true, runValidators: true },
        );
        if (!updatedTask) {
            throw new NotFoundException('Task not found or you do not have access');
        }
        return updatedTask;
    }

    async delete(id: string, user: User): Promise<Task> {
        const deletedTask = await this.taskModel.findOneAndDelete({
            _id: id,
            user: user._id,
        });
        if (!deletedTask) {
            throw new NotFoundException('Task not found or you do not have access');
        }
        return deletedTask;
    }
}
