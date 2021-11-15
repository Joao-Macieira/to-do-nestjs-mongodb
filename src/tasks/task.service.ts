import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskEntity } from './entity/tasks.model';
import { Model } from 'mongoose';
import { UpdateTaskDto } from './dto/UpdateTaskDto';
import { CreateTaskDto } from './dto/CreateTaskDto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<TaskEntity>,
  ) {}

  async findAll(): Promise<TaskEntity[]> {
    const result = await this.taskModel.find();
    return result;
  }
  async create(doc: CreateTaskDto) {
    const result = await new this.taskModel(doc).save();
    return result;
  }

  async findById(id: number) {
    const result = await this.taskModel.findById({ _id: id });
    return result;
  }

  async update(id: string, task: UpdateTaskDto) {
    await this.taskModel.findByIdAndUpdate({ _id: id }, task);
    const result = await this.taskModel.findById({ _id: id });
    return result;
  }

  async remove(task: TaskEntity) {
    try {
      await this.taskModel.deleteOne({ _id: task });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
