import { IsDate, IsDateString, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString } from "class-validator";
import { IFlight } from "src/flights/flight.model";
import { IAuditFields } from "src/models/audit-fields.model";
import { IMoney } from "src/models/money.model";

export class CreateQuotationDto{
    
    @IsString()
    @IsNotEmpty()
    quotationNumber: string;

    @IsString()
    @IsNotEmpty()
    quotationRequestId: string;

    @IsString()
    @IsNotEmpty()
    status: 'Accepted' | 'Submitted' | 'Rejected';

    @IsString()
    @IsNotEmpty()
    aircraftId: string;

    @IsString()
    @IsNotEmpty()
    operatorId: string;

    @IsNumber()
    @IsNotEmpty()
    flightDuration: number; // Hours

    @IsObject()
    @IsNotEmptyObject()
    price: IMoney;

    @IsDateString()
    @IsNotEmpty()
    expirationDate: Date;

    @IsObject()
    @IsNotEmptyObject()
    flightDetails: IFlight;

    @IsObject()
    @IsNotEmptyObject()
    auditFields: IAuditFields;
}