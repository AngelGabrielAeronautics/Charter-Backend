import { IsString, IsNumber, IsOptional, IsDateString } from "class-validator"
import { Type } from "class-transformer"

export class RecordPaymentDto {
  @IsString()
  invoiceId: string

  @IsNumber()
  @Type(() => Number)
  amount: number

  @IsString()
  @IsOptional()
  currency?: string

  @IsString()
  paymentMethod: string

  @IsDateString()
  paymentDate: string

  @IsString()
  @IsOptional()
  bankTransferReference?: string

  @IsDateString()
  @IsOptional()
  bankTransferDate?: string

  @IsString()
  @IsOptional()
  notes?: string
}
