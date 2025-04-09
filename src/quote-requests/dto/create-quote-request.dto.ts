import { IsString, IsNumber, IsBoolean, IsOptional, IsDateString, IsArray, Min, ValidateNested } from "class-validator"
import { Type } from "class-transformer"

export class ExtraDto {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsBoolean()
  @IsOptional()
  required?: boolean
}

export class CreateQuoteRequestDto {
  @IsString()
  from: string

  @IsString()
  to: string

  @IsDateString()
  date: string

  @IsDateString()
  @IsOptional()
  returnDate?: string

  @IsString()
  @IsOptional()
  time?: string

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  passengers: number

  @IsBoolean()
  @IsOptional()
  isFlexibleDate?: boolean

  @IsBoolean()
  @IsOptional()
  isFlexibleTime?: boolean

  @IsBoolean()
  @IsOptional()
  isReturnFlight?: boolean

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  multiCityRoutes?: string[]

  @IsBoolean()
  @IsOptional()
  extraBaggage?: boolean

  @IsBoolean()
  @IsOptional()
  pets?: boolean

  @IsBoolean()
  @IsOptional()
  hardBags?: boolean

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExtraDto)
  @IsOptional()
  extras?: ExtraDto[]
}
