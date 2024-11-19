import { IAuditFields } from "src/models/audit-fields.model";

export interface IAgency{
    userId: string;
    country: string;
    email: string;
    dialCode: string;
    phone: string;
    auditFields: IAuditFields;
}