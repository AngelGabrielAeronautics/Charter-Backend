import { IFlight } from "src/flights/flight.model";
import { IAuditFields } from "src/models/audit-fields.model";
import { IMoney } from "src/models/money.model";

export interface IQuotation{
    _id?: string;
    quotationNumber: string;
    quotationRequestId: string;
    status: 'Accepted' | 'Submitted' | 'Rejected';
    aircraftId: string;
    operatorId: string;
    flightDuration: number; // Hours
    price: IMoney;
    expirationDate: Date;
    flightDetails: IFlight;
    auditFields: IAuditFields;
}