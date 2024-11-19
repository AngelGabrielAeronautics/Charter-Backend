import { IAddress } from "src/models/address.model";
import { IAuditFields } from "src/models/audit-fields.model";
import { IFile } from "src/models/file.model";
import { IFileInfo } from "src/models/fileInfo.model";
import { IPerson } from "src/models/person.model";

export interface IOperator {
  _id?: string;
  logo?: IFile;
  airline: string;
  registrationNumber: string;
  operatorCode: string;
  country: string;
  email: string;
  phone: string;
  vatNumber?: string;
  aocNumber?: string;
  address: IAddress;
  status: 'Unverified' | 'Verified';
  vettingStatus: IVettingStatus;
  profileCompletePercentage: number;
  responsiblePerson: IContactPerson;
  bankingDetails: IBankingDetails;
  accountingResponsiblePerson: IContactPerson;
  certifications: IFileInfo[];
  acceptedTermsAndConditions: boolean;
  cancellationPolicy: string;
  refundPolicy: string;
  termsAndConditions: IFile;
  auditFields: IAuditFields;
}

export interface IContactPerson extends IPerson {
  email: string;
  phone: string;
  country: string;
}

export interface IBankingDetails {
  name: string;
  accountHolder: string;
  accountNumber: string;
  accountType: string;
  branchCode: string;
  accountConfirmationLetter?: IFileInfo;
}

export interface IVettingStatus {
  companyDetails: ESectionVettingStatus;
  documentation: ESectionVettingStatus;
  termsAndConditions: ESectionVettingStatus;
}

export enum ESectionVettingStatus {
  "approved",
  "rejected",
  "pending"
}