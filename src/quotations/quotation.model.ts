import { IAirport } from "src/airports/airport.model";
import { IFlight } from "src/flights/flight.model";
import { IAuditFields } from "src/models/audit-fields.model";
import { IMoney } from "src/models/money.model";

export interface IQuotation {
    _id?: string;
    quotationNumber: string;
    quotationRequestId: string;
    status: 'Accepted' | 'Submitted' | 'Rejected';
    aircraftId: string;
    operatorId: string;
    trip: ITripDetailsItem[];
    price: IMoney;
    expirationDate: Date;
    flightDetails: IFlight;
    auditFields: IAuditFields;
}

export interface ITripDetailsItem {
    departureDate: string;
    departureMeetingPlace: string;
    departureMeetingTime: string;
    arrivalDate: string;
    arrivalMeetingPlace: string;
    arrivalMeetingTime: string;
    flightDurationHours: number;
    flightDurationMinutes: number;
    flightDuration?: string;
    flexibleDate: boolean;
    flexibleDepartureTime: boolean;
    flexibleRouting: boolean
    departureAirport: IAirport;
    arrivalAirport: IAirport;
}