import { IsString, IsNumber, IsBoolean, IsOptional, IsDateString, Min } from "class-validator"
import { Type } from "class-transformer"

export class CreateDeadLegDto {
  @IsString()
  aircraftRegistration: string

  @IsString()
  manufacturer: string

  @IsString()
  model: string

  @IsString()
  from: string

  @IsString()
  to: string

  @IsBoolean()
  @IsOptional()
  flexibleRouting?: boolean

  @IsDateString()
  date: string

  @IsString()
  departureTime: string

  @IsNumber()
  @Type(() => Number)
  flightDuration: number

  @IsBoolean()
  @IsOptional()
  dateFlexible?: boolean

  @IsBoolean()
  @IsOptional()
  departureTimeFlexible?: boolean

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  offerExpiresHours: number

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  maxSeatsAvailable: number

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  maxLuggagePerPassenger: number

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  pricePerSeat: number

  @IsString()
  @IsOptional()
  notes?: string

  @IsString()
  @IsOptional()
  aircraftImage?: string
}
