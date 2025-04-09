import { IsString, IsOptional, IsArray, ValidateNested, IsDateString } from "class-validator"
import { Type } from "class-transformer"

class PassengerDetailDto {
  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsString()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  phone?: string

  @IsDateString()
  @IsOptional()
  dateOfBirth?: string

  @IsString()
  @IsOptional()
  nationality?: string

  @IsString()
  @IsOptional()
  passportNumber?: string

  @IsDateString()
  @IsOptional()
  passportExpiry?: string
}

export class CreateBookingDto {
  @IsString()
  quoteId: string

  @IsString()
  @IsOptional()
  specialRequests?: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PassengerDetailDto)
  passengerDetails: PassengerDetailDto[]
}
