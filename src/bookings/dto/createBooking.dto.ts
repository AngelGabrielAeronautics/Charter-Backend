import { IsArray, IsDecimal, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { IUser } from "src/users/user.model";
import { IBookedItem } from "../booking.model";
import { IAuditFields } from "src/models/audit-fields.model";

export class CreateBookingDto {
    @IsObject()
    @IsNotEmptyObject()
    customer: IUser;

    @IsNumber()
    @IsNotEmpty()
    numberOfPassengers: number;

    @IsString()
    @IsOptional()
    flightNumber: string;

    @IsString()
    @IsOptional()
    flightId?: string;

    @IsString()
    @IsNotEmpty()
    operatorId: string;

    @IsString()
    @IsOptional()
    agencyId: string;

    @IsString()
    @IsNotEmpty()
    operatorName: string;

    @IsString()
    @IsOptional()
    invoiceId: string;

    @IsString()
    @IsNotEmpty()
    status: 'Pending' | 'Invoiced' | 'Paid' | 'Cancelled';

    @IsArray()
    items: IBookedItem[];

    @IsString()
    @IsNotEmpty()
    currency: string;

    @IsNotEmpty()
    @IsNumber()
    subTotal: number;

    @IsNotEmpty()
    @IsNumber()
    taxAmount: number;

    @IsNotEmpty()
    @IsNumber()
    totalAmount: number;

    @IsOptional()
    @IsDecimal()
    platformFee?: number;

    @IsObject()
    @IsNotEmptyObject()
    auditFields: IAuditFields;

    // The bookingNumber is automatically generated, so it's excluded here
}