import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './tasks.model';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async findAll(): Promise<Task[]> {
    const result = await this.taskModel.find();
    return result;
  }
  async create(doc: Task) {
    const result = await new this.taskModel(doc).save();
    return result.id;
  }

  async findById(id: number) {
    const result = await this.taskModel.findById({ _id: id });
    return result;
  }

  async update(id: string, task: Task) {
    await this.taskModel.findByIdAndUpdate({ _id: id }, task);
    const result = await this.taskModel.findById({ _id: id });
    return result;
  }

  async remove(task: Task) {
    const result = await this.taskModel.deleteOne({ _id: task });
    return result;
  }
}
