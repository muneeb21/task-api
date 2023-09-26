import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from '../dtos/CreateTaskDto';
import { UpdateTaskDto } from '../dtos/UpdateTaskDto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<any> {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch(':id')
  async updateTask(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task> {
    return this.taskService.updateTaskById(updateTaskDto, id);
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.deleteTaskById(id);
  }

  @Get()
  async getTasks(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<Task[]> {
    return this.taskService.getTasks(page, limit);
  }

  @Get('metrics')
  async getTaskMetrics(): Promise<any> {
    // return [];
    return this.taskService.getTaskMetrics();
  }
}
