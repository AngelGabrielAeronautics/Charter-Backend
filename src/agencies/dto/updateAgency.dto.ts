import { PartialType } from "@nestjs/mapped-types";
import { CreateAgencyDto } from "./createAgency.dto";

export class UpdateAgencyDto extends PartialType(CreateAgencyDto) {}