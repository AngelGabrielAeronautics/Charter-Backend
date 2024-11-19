import { PartialType } from "@nestjs/mapped-types";
import { CreateQuotationRequestDto } from "./createQuotationRequest.dto";

export class UpdateQuotationRequestDto extends PartialType(CreateQuotationRequestDto) {}