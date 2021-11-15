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
import { CreateTaskDto } from './dto/CreateTaskDto';
import { UpdateTaskDto } from './dto/UpdateTaskDto';

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
  create(@Body() task: CreateTaskDto) {
    return this.service.create(task);
  }

  @Put(':id')
  update(@Param() params, @Body() task: UpdateTaskDto) {
    return this.service.update(params.id, task);
  }

  @Delete(':id')
  remove(@Param() params) {
    try {
      return this.service.remove(params.id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
