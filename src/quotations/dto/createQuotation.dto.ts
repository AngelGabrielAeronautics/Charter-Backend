import { IsDateString, IsNotEmpty, IsNotEmptyObject, IsObject, IsString } from "class-validator";
import { IFlight } from "src/flights/flight.model";
import { IAuditFields } from "src/models/audit-fields.model";
import { IMoney } from "src/models/money.model";

export class CreateQuotationDto {

    @IsString()
    @IsNotEmpty()
    quotationRequestId: string;

    @IsString()
    @IsNotEmpty()
    aircraftId: string;

    @IsString()
    @IsNotEmpty()
    operatorId: string;

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