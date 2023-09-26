'use strict';

import { IsEnum, IsNotEmpty } from 'class-validator';
import { TASK_STATUS_ENUM } from '../constants/constants';

export class CreateTaskDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(TASK_STATUS_ENUM)
  status: string;
}
