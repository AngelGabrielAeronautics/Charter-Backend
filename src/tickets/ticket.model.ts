import { IAuditFields } from "src/models/audit-fields.model";
import { IPerson } from "src/models/person.model";

export interface ITicket{

    ticketNumber: string;
    customerId: string;
    bookingId: string;
    invoiceId: string;
    operatorId: string;
    agencyId?: string;
    flightId: string;

    pdfFile?: string;
    passengerDetails?: IPerson;
    auditFields: IAuditFields;
}