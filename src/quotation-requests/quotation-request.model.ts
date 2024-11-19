import { IAirport } from "src/airports/airport.model";
import { IAuditFields } from "src/models/audit-fields.model";
import { IUser } from "src/users/user.model";

export interface IQuotationRequest{
    quotationRequestNumber: string; // e.g QR-20240716-010
    status: "Fulfilled" | "Pending" | "Quoted" | "Cancelled";
    departureAirport: IAirport;
    arrivalAirport: IAirport;
    dateOfDeparture: Date; // time is inferred from this date
    customer: IUser;
    numberOfPassengers: number;
    numberOfAdults: number;
    numberOfChildren: number;
    numberOfInfants: number;
    petsAllowed: boolean;
    smokingAllowed: boolean;
    auditFields: IAuditFields;
}