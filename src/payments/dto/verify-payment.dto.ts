import { IsString, IsOptional } from "class-validator"

export class VerifyPaymentDto {
  @IsString()
  @IsOptional()
  notes?: string
}
