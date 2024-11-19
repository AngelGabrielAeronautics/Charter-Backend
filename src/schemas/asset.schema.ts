import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IAuditFields } from 'src/models/audit-fields.model';
import { AuditFieldsSchema } from './audit-fields.schema';
import { IFile } from 'src/models/file.model';

export type AssetDocument = HydratedDocument<Asset>;

@Schema()
export class Asset {
  @Prop({ required: true })
  operatorId: string;

  @Prop({ required: false, default: false })
  airConAvailable: boolean;

  @Prop({ required: false })
  airline: string;

  @Prop({ required: false })
  airworthinessCertificateFilePath: string;

  @Prop({ required: false, default: false })
  apu: boolean;

  @Prop({ required: false, default: 0 })
  baggage_compartment_max_weight: number;

  @Prop({ required: false, default: 'kgs' })
  baggageCompartmentMaxWeightUnits: string;

  @Prop({ required: false, type: Array, default: [0, 0, 0] })
  baggageCompartmentSize: number[];

  @Prop({ required: false })
  baggageType: string;

  @Prop({ required: false })
  cabinLayoutImagePath: string;

  @Prop({ required: false, default: 0 })
  cabinHeight: number;

  @Prop({ required: false, default: 0 })
  cabinLength: number;

  @Prop({ required: false, default: 0 })
  cabinWidth: number;

  @Prop({ required: false, default: false })
  cabinPressure: boolean;

  @Prop({ required: false, default: 0 })
  cargoCapacity: number;

  @Prop({ required: false })
  cargoCapacityUnits: string;

  @Prop({ required: false, default: 0 })
  cruiseSpeedInKnots: number;

  @Prop({ required: false })
  cockpitImagePath: string;

  @Prop({ required: false })
  exteriorImagePath: string;

  @Prop({ required: false })
  featureImageURL: string;

  @Prop({ required: false, type: Array, default: [] })
  images?: IFile[];

  @Prop({ required: false, default: false })
  heated: boolean;

  @Prop({ required: false, default: 0 })
  inflightServicePersonnel: number;

  @Prop({ required: false })
  insuranceCertificateFilePath: string;

  @Prop({ required: false })
  interiorImagePath: string;

  @Prop({ required: false })
  lastRefurbishmentDate: Date;

  @Prop({ required: false })
  manufacturer: string;

  @Prop({ required: false, default: 1 })
  minimumCockpitCrew: number;

  @Prop({ required: false })
  model: string;

  @Prop({ required: false, default: 0 })
  numberOfCrew: number;

  @Prop({ required: false, default: false })
  petsAllowed: boolean;

  @Prop({ required: false })
  powerPlant: string;

  @Prop({ required: false, default: false })
  pressurized: boolean;

  @Prop({ unique: true, required: true })
  registrationNumber: string;

  @Prop({ required: false, default: 0 })
  seatingCapacity: number;

  @Prop({ required: false })
  serviceReleaseFilePath: string;

  @Prop({ required: false, default: false })
  smokingAllowed: boolean;

  @Prop({ required: false, default: false })
  suitableForUnpavedAirfield: boolean;

  @Prop({ required: false, default: false })
  hasWashCloset: boolean;

  @Prop({ required: false })
  yearOfManufacture: number;

  @Prop({ required: false, default: "Draft" })
  status: string;

  @Prop({ required: true, type: AuditFieldsSchema })
  auditFields: IAuditFields;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);