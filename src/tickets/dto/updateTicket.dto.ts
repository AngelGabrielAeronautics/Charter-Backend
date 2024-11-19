import { PartialType } from "@nestjs/mapped-types";
import { CreateTicketDto } from "./createTicket.dto";

export class UpdateTicketDto extends PartialType(CreateTicketDto) {}