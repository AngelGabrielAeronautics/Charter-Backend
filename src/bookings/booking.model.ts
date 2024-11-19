import { IAuditFields } from "src/models/audit-fields.model";
import { IUser } from "src/users/user.model";

export interface IBooking{
    bookingNumber?: string;
    customer: IUser;
    numberOfPassengers: number;
    flightNumber?: string;
    flightId? : string;
    operatorId: string;
    agencyId?: string;
    operatorName: string;
    items: IBookedItem[];
    currency: string;
    subTotal: number;
    taxAmount: number;
    totalAmount: number;
    platformFee: number;
    invoiceId?: string;
    status: 'Pending' | 'Invoiced' | 'Paid' | 'Cancelled';
    auditFields: IAuditFields;
}

export interface IBookedItem{
    adults: number;
    children: number;
    infants: number;
    totalNumberOfPassengers: number;
    totalPrice: number;
}