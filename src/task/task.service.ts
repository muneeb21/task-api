import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TASK_STATUS } from '..//constants/constants';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(payload: any): Promise<Task> {
    const { name, description, status } = payload;

    const task = this.taskRepository.create({ name, description, status });
    return this.taskRepository.save(task);
  }

  async updateTaskById(payload: any, id: number): Promise<any> {
    const task = await this.taskRepository.update({ id }, { ...payload });

    return task;
  }

  async deleteTaskById(id: number): Promise<any> {
    const task = await this.taskRepository.update({ id }, { isArchived: true });

    return task;
  }

  async getTasks(page: number, limit: number): Promise<Task[]> {
    return await this.taskRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        isArchived: false,
      },
    });
  }

  async getTaskMetrics(): Promise<any> {
    const metricsByTimeline = [];

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    for (let i = 0; i < 12; i++) {
      const date = new Date(currentYear, currentMonth - i, 1);
      const monthName = months[date.getMonth()];
      const year = date.getFullYear();
      if (year < currentYear) {
        break;
      }

      const metrics = await this.taskRepository
        .createQueryBuilder('task')
        .select('COUNT(task.id)', 'count')
        .addSelect('task.status', 'status')
        .where('task.isArchived = :isArchived', { isArchived: false })
        .andWhere('EXTRACT(YEAR FROM task.createdAt) = :year', { year })
        .andWhere('EXTRACT(MONTH FROM task.createdAt) = :month', {
          month: date.getMonth() + 1,
        })
        .groupBy('task.status')
        .getRawMany();

      const metricObject = {
        date: `${monthName} ${year}`,
        metrics: {
          open_tasks: 0,
          inprogress_tasks: 0,
          completed_tasks: 0,
        },
      };

      metrics.forEach((metric) => {
        switch (metric.status) {
          case TASK_STATUS.OPEN:
            metricObject.metrics.open_tasks = +metric.count;
            break;
          case TASK_STATUS.IN_PROGRESS:
            metricObject.metrics.inprogress_tasks = +metric.count;
            break;
          case TASK_STATUS.COMPLETED:
            metricObject.metrics.completed_tasks = +metric.count;
            break;
          default:
            break;
        }
      });

      metricsByTimeline.push(metricObject);
    }
    const metricsByStatus = await this.taskRepository
      .createQueryBuilder('task')
      .select('COUNT(CASE WHEN task.status = :open THEN 1 END)', 'open_tasks')
      .addSelect(
        'COUNT(CASE WHEN task.status = :inprogress THEN 1 END)',
        'inprogress_tasks',
      )
      .addSelect(
        'COUNT(CASE WHEN task.status = :completed THEN 1 END)',
        'completed_tasks',
      )
      .where('task.isArchived = :isArchived', { isArchived: false })
      .setParameters({
        open: 'open',
        inprogress: 'inprogress',
        completed: 'completed',
      })
      .getRawOne();

    return { metricsByStatus, metricsByTimeline };
  }
}
