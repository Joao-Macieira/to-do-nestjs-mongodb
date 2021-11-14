import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './tasks.model';

@Controller('task')
export class TaskController {
  constructor(private service: TaskService) {}

  @Get('')
  getAll() {
    return this.service.findAll();
  }
  @Get(':id')
  get(@Param() params) {
    return this.service.findById(params.id);
  }

  @Post('create')
  create(@Body() task: Task) {
    return this.service.create(task);
  }

  @Put(':id')
  update(@Param() params, @Body() task: Task) {
    return this.service.update(params.id, task);
  }

  @Delete(':id')
  remove(@Param() params) {
    return this.service.remove(params.id);
  }
}
