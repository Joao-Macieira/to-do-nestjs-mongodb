import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  done: { type: Boolean, required: true },
});

export class TaskEntity {
  name: string;
  done: boolean;

  constructor(task?: Partial<TaskEntity>) {
    this.name = task?.name;
    this.done = task?.done;
  }
}
