import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsDateString()
  @IsNotEmpty()
  readonly dueDate: Date;

  @IsString()
  @IsEnum(['pending', 'started', 'completed', 'cancelled'])
  readonly status: string;
}
