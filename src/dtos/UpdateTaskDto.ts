'use strict';

import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TASK_STATUS_ENUM } from '../constants/constants';

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsEnum(TASK_STATUS_ENUM)
  status: string;
}
