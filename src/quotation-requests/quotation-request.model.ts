import { IAuditFields } from "src/models/audit-fields.model";
import { IPassengerCount, ITripLeg } from "./dto/createQuotationRequest2.dto";

export interface IQuotationRequest{
    customerId?: string;
    quotationRequestNumber: string; // e.g QR-20240716-010
    numberOfPassengers: IPassengerCount;
    trip: ITripLeg[]
    petsAllowed: boolean;
    smokingAllowed: boolean;
    status: "Fulfilled" | "Pending" | "Quoted" | "Cancelled";
    auditFields: IAuditFields;
}