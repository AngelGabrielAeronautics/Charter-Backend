import { IsString, IsOptional, IsDateString } from "class-validator"

export class QueryDeadLegsDto {
  @IsString()
  @IsOptional()
  from?: string

  @IsString()
  @IsOptional()
  to?: string

  @IsDateString()
  @IsOptional()
  date?: string

  @IsString()
  @IsOptional()
  operatorId?: string
}
