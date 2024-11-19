import { PartialType } from "@nestjs/mapped-types";
import { CreateQuotationDto } from "./createQuotation.dto";

export class UpdateQuotationDto extends PartialType(CreateQuotationDto) {}