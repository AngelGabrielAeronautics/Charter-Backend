import { IsArray, IsBoolean, IsDecimal, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString } from "class-validator"
import { IAddress } from "src/models/address.model";
import { IAuditFields } from "src/models/audit-fields.model";
import { IFile } from "src/models/file.model";
import { IFileInfo } from "src/models/fileInfo.model";
import { IBankingDetails, IContactPerson } from "../operator.model";

export class CreateOperatorDto {
    /**
     * Required fields on create
     */
    @IsString()
    @IsNotEmpty()
    airline: string;

    @IsString()
    @IsNotEmpty()
    country: string;
    
    @IsString()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    phone: string;
    
    @IsString()
    @IsOptional()
    aocNumber?: string;
    /**
     * END Required fields on create
     */

    @IsOptional()
    @IsObject()
    logo?: IFile;

    @IsOptional()
    @IsString()
    registrationNumber: string;

    @IsOptional()
    @IsString()
    operatorCode: string;

    @IsOptional()
    @IsString()
    vatNumber?: string;

    @IsOptional()
    @IsObject()
    address?: IAddress;

    @IsOptional()
    @IsString()
    status: 'Unverified' | 'Verified';

    @IsOptional()
    @IsDecimal()
    profileCompletePercentage: number;

    @IsOptional()
    @IsObject()
    responsiblePerson: IContactPerson;

    @IsOptional()
    @IsObject()
    bankingDetails: IBankingDetails;

    @IsOptional()
    @IsObject()
    accountingResponsiblePerson: IContactPerson;
    
    @IsOptional()
    @IsArray()
    certifications: IFileInfo[];

    @IsOptional()
    @IsBoolean()
    acceptedTermsAndConditions: boolean;

    @IsOptional()
    @IsString()
    cancellationPolicy: string;

    @IsOptional()
    @IsString()
    refundPolicy: string;

    @IsOptional()
    @IsString()
    termsAndConditions: string;

    @IsNotEmptyObject()
    @IsObject()
    auditFields: IAuditFields;
}
