import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IAddress } from "src/models/address.model";
import { IAuditFields } from "src/models/audit-fields.model";
import { IFile } from "src/models/file.model";
import { IFileInfo } from "src/models/fileInfo.model";
import { IBankingDetails, IContactPerson, IVettingStatus } from "src/operators/operator.model";

export type OperatorDocument = HydratedDocument<Operator>;

@Schema()
export class Operator {

    /**
     * Required fields on create
     */
    @Prop({ required: true })
    airline: string;


    @Prop({ required: true })
    country: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: false })
    aocNumber?: string;
    /**
     * END Required fields on create
     */

    @Prop({ required: false, type: Object })
    logo?: IFile;

    @Prop({ required: false })
    registrationNumber: string;

    @Prop({ required: false })
    operatorCode: string;

    @Prop({ required: false })
    vatNumber?: string;

    @Prop({ required: false, type: Object })
    address?: IAddress;

    @Prop({ required: false, default: 'Unverified' })
    status: 'Unverified' | 'Verified';

    @Prop({ required: false, default: 0.0 })
    profileCompletePercentage: number;

    @Prop({ required: false, type: Object })
    responsiblePerson: IContactPerson;

    @Prop({ required: false, type: Object })
    bankingDetails: IBankingDetails;

    @Prop({ required: false, type: Object })
    accountingResponsiblePerson: IContactPerson;

    @Prop({ required: false, type: Array<object> })
    certifications: IFileInfo[];

    @Prop({ required: false })
    acceptedTermsAndConditions: boolean;

    @Prop({
        required: false,
        type: Object,
        default: {
            companyDetails: "pending",
            documentation: "pending",
            termsAndConditions: "pending"
        }
    })
    vettingStatus: IVettingStatus;

    @Prop({ required: false })
    cancellationPolicy: string;

    @Prop({ required: false })
    refundPolicy: string;

    @Prop({ required: false, type: Object })
    termsAndConditions: IFile;

    @Prop({ required: true, type: Object })
    auditFields: IAuditFields;
}

export const OperatorSchema = SchemaFactory.createForClass(Operator);