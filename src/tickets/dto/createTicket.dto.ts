import { IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString } from "class-validator";
import { IAuditFields } from "src/models/audit-fields.model";
import { IPerson } from "src/models/person.model";

export class CreateTicketDto{
    @IsString()
    @IsOptional()
    ticketNumber: string;

    @IsString()
    @IsNotEmpty()
    customerId: string;

    @IsString()
    @IsNotEmpty()
    bookingId: string;

    @IsString()
    @IsNotEmpty()
    invoiceId: string;

    @IsString()
    @IsNotEmpty()
    operatorId: string;

    @IsString()
    @IsOptional()
    agencyId?: string;

    @IsString()
    @IsNotEmpty()
    flightId: string;

    @IsString()
    @IsOptional()
    pdfFile?: string;

    @IsObject()
    @IsOptional()
    passengerDetails?: IPerson;

    @IsObject()
    @IsNotEmptyObject()
    auditFields: IAuditFields;
}