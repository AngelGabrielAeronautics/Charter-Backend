import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";
import { IAuditFields } from "src/models/audit-fields.model";

export class CreateAssetDto {
  //@IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  airConAvailable: boolean;

  //@IsNotEmpty()
  @IsString()
  operatorId: string;

  // //@IsNotEmpty()
  // @IsString()
  // airline: string;
  // airworthinessCertificateFilePath: string;

  //@IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  apu: boolean;

  //@IsNotEmpty()
  @IsNumber()
  @IsOptional()
  baggage_compartment_max_weight: number;

  //@IsNotEmpty()
  @IsString()
  @IsOptional()
  baggageCompartmentMaxWeightUnits: string;

  //@IsNotEmpty()
  @IsOptional()
  baggageCompartmentSize: number[];

  //@IsNotEmpty()
  @IsString()
  @IsOptional()
  baggageType: string;
  // cabinLayoutImagePath: string;

  //@IsNotEmpty()
  @IsNumber()
  @IsOptional()
  cabinHeight: number;

  //@IsNotEmpty()
  @IsNumber()
  @IsOptional()
  cabinLength: number;

  //@IsNotEmpty()
  @IsNumber()
  @IsOptional()
  cabinWidth: number;

  //@IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  cabinPressure: boolean;

  //@IsNotEmpty()
  @IsNumber()
  @IsOptional()
  cargoCapacity: number;

  //@IsNotEmpty()
  @IsString()
  @IsOptional()
  cargoCapacityUnits: string;
  // cockpitImagePath: string;

  //@IsNotEmpty()
  @IsNumber()
  @IsOptional()
  cruiseSpeedInKnots: number;
  // exteriorImagePath: string;
  // featureImageURL: string;

  //@IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  heated: boolean;

  //@IsNotEmpty()
  @IsNumber()
  @IsOptional()
  inflightServicePersonnel: number;
  // insuranceCertificateFilePath: string;
  // interiorImagePath: string;

  //@IsNotEmpty()
  @IsDateString()
  @IsOptional()
  lastRefurbishmentDate: Date;

  //@IsNotEmpty()
  @IsString()
  @IsOptional()
  manufacturer: string;

  //@IsNotEmpty()
  @IsNumber()
  @IsOptional()
  minimumCockpitCrew: number;

  //@IsNotEmpty()
  @IsString()
  @IsOptional()
  model: string;

  //@IsNotEmpty()
  @IsNumber()
  @IsOptional()
  numberOfCrew: number;

  //@IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  petsAllowed: boolean;

  //@IsNotEmpty()
  @IsString()
  @IsOptional()
  powerPlant: string;

  //@IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  pressurized: boolean;

  // @IsNotEmpty()
  @IsString()
  registrationNumber: string;

  //@IsNotEmpty()
  @IsNumber()
  @IsOptional()
  seatingCapacity: number;
  // serviceReleaseFilePath: string;

  //@IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  smokingAllowed: boolean;

  //@IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  suitableForUnpavedAirfield: boolean;

  //@IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  hasWashCloset: boolean;

  //@IsNotEmpty()
  @IsNumber()
  @IsOptional()
  yearOfManufacture: number;

  auditFields: IAuditFields;
}
