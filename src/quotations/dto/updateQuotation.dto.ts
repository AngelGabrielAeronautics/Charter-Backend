import { PartialType } from "@nestjs/mapped-types";
import { CreateQuotationDto } from "./createQuotation.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateQuotationDto extends PartialType(CreateQuotationDto) {
  @IsString()
  @IsNotEmpty()
  status: 'Accepted' | 'Submitted' | 'Rejected';
}