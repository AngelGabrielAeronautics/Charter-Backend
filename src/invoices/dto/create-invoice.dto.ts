import { IsString, IsNumber, IsOptional, IsDateString, ValidateNested } from "class-validator"
import { Type } from "class-transformer"

export class BankDetailsDto {
  @IsString()
  bankName: string

  @IsString()
  accountHolder: string

  @IsString()
  iban: string

  @IsString()
  swift: string

  @IsString()
  reference: string
}

export class CreateInvoiceDto {
  @IsString()
  bookingId: string

  @IsNumber()
  @Type(() => Number)
  amount: number

  @IsString()
  @IsOptional()
  currency?: string

  @IsDateString()
  dueDate: string

  @IsString()
  @IsOptional()
  paymentInstructions?: string

  @ValidateNested()
  @Type(() => BankDetailsDto)
  bankDetails: BankDetailsDto

  @IsString()
  @IsOptional()
  notes?: string
}
