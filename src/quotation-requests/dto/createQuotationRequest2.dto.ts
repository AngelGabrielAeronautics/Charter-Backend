import { IsArray, IsBoolean, IsNotEmpty, IsObject, IsString } from "class-validator";
import { IAirport } from "src/airports/airport.model";

export class CreateQuotationRequest2Dto {
    @IsString()
    @IsNotEmpty()
    customerId: string;

    @IsObject()
    @IsNotEmpty()
    numberOfPassengers: IPassengerCount;

    @IsArray()
    @IsNotEmpty()
    trip: ITripLeg[]

    @IsBoolean()
    @IsNotEmpty()
    petsAllowed: boolean;

    @IsBoolean()
    @IsNotEmpty()
    smokingAllowed: boolean;
}

export interface ITripLeg {
    departureAirport: IAirport;
    arrivalAirport: IAirport;
    dateOfDeparture: Date;
    timeOfDeparture: string;
}

export interface IPassengerCount {
    total: number;
    adults: number;
    children: number;
    infants: number;
}