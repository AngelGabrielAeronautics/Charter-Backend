import { IsDate, IsDecimal, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { IAuditFields } from "src/models/audit-fields.model";

export class CreateInvoiceDto {
    
    @IsOptional()
    @IsString()
    invoiceNumber: string;

    @IsString()
    @IsNotEmpty()
    status: 'Paid' | 'Due' | 'Cancelled';

    @IsDecimal()
    @IsNotEmpty()
    subTotal: number;

    @IsDecimal()
    @IsNotEmpty()
    taxAmount: number;

    @IsDecimal()
    @IsNotEmpty()
    totalAmount: number;

    @IsString()
    @IsNotEmpty()
    flightId: string;

    @IsString()
    @IsNotEmpty()
    customerId: string;

    @IsString()
    @IsNotEmpty()
    bookingId: string;

    @IsDate()
    @IsNotEmpty()
    dateIssued: Date;

    @IsString()
    @IsNotEmpty()
    currency: string;

    @IsObject()
    @IsNotEmpty()
    auditFields: IAuditFields;
}