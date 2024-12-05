import { IsBoolean, IsDateString, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString } from "class-validator";
import { IAirport } from "src/airports/airport.model";
import { IAuditFields } from "src/models/audit-fields.model";
import { IUser } from "src/users/user.model";

export class CreateQuotationRequestDto {

    @IsString()
    @IsNotEmpty()
    quotationRequestNumber: string; // e.g QR-20240716-010

    @IsString()
    @IsNotEmpty()
    status: "Fulfilled" | "Pending" | "Quoted" | "Cancelled";

    @IsObject()
    @IsNotEmptyObject()
    departureAirport: IAirport;

    @IsObject()
    @IsNotEmptyObject()
    arrivalAirport: IAirport;

    @IsDateString()
    @IsNotEmpty()
    dateOfDeparture: Date;

    @IsString()
    @IsNotEmpty()
    timeOfDeparture: string;

    @IsObject()
    @IsNotEmptyObject()
    customer: IUser;

    @IsNumber()
    @IsNotEmpty()
    numberOfPassengers: number;

    @IsNumber()
    @IsNotEmpty()
    numberOfAdults: number;

    @IsNumber()
    @IsNotEmpty()
    numberOfChildren: number;

    @IsNumber()
    @IsNotEmpty()
    numberOfInfants: number;

    @IsBoolean()
    @IsNotEmpty()
    petsAllowed: boolean;

    @IsBoolean()
    @IsNotEmpty()
    smokingAllowed: boolean;

    @IsObject()
    @IsNotEmptyObject()
    auditFields: IAuditFields;
}