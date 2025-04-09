import { IsString, IsNumber, IsOptional, IsArray, Min } from "class-validator"
import { Type } from "class-transformer"

export class CreateQuoteDto {
  @IsString()
  quoteRequestId: string

  @IsString()
  operatorQuoteNumber: string

  @IsString()
  aircraftRegistration: string

  @IsString()
  aircraftType: string

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  price: number

  @IsString()
  @IsOptional()
  currency?: string

  @IsString()
  @IsOptional()
  departureTime?: string

  @IsString()
  @IsOptional()
  arrivalTime?: string

  @IsString()
  @IsOptional()
  returnDepartureTime?: string

  @IsString()
  @IsOptional()
  returnArrivalTime?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  technicalStops?: string[]

  @IsString()
  @IsOptional()
  responseMessage?: string

  @IsString()
  @IsOptional()
  responseType?: string
}
