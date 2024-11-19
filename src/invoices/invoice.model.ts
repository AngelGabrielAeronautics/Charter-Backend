import { IAuditFields } from "src/models/audit-fields.model";

export interface IInvoice{
    invoiceNumber: string;
    status: 'Paid' | 'Due' | 'Cancelled';
    subTotal: number;
    taxAmount: number;
    totalAmount: number;
    flightId?: string;
    customerId: string;
    bookingId: string;
    quotationId?: string;
    dateIssued: Date;
    currency: string;
    auditFields: IAuditFields;
}