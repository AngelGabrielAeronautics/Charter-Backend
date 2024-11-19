import { IsNotEmpty, IsNotEmptyObject, IsObject, IsString } from "class-validator";
import { IAuditFields } from "src/models/audit-fields.model";

export class CreateAgencyDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    dialCode: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsObject()
    @IsNotEmptyObject()
    auditFields: IAuditFields;
}