import { IsDateString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class PeriodStatsDto {
  @IsDateString()
  period: string;

  @IsNumber()
  @Type(() => Number)
  avg_temp: number;

  @IsNumber()
  @Type(() => Number)
  avg_cpu: number;
}

export interface LastTempAvg {
  period: string,
  avg_temp: number,
  last_temp: number,
  avg_cpu:number
}