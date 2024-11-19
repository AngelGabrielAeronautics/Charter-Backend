import { IsArray, IsBoolean, IsDate, IsDecimal, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { IAirport } from "src/airports/airport.model";
import { INote } from "src/models/notes.model";
import { IAuditFields } from "src/models/audit-fields.model";
import { IFlightChecklist } from "../flight.model";

export class CreateFlightDto{

  // //@IsNotEmpty()
  // @IsString()
  // airline: string;

  // //@IsNotEmpty()
  // @IsNumber()
  // capacity: number;

  //@IsNotEmpty()
  @IsString()
  departure: string;

  //@IsNotEmpty()
  @IsNumber()
  duration: number;

  // @IsOptional()
  // @IsNumber()
  // maxSeatsAvailable: number;

  //@IsNotEmpty()
  @IsOptional()
  flightNumber: string;

  // @IsNotEmptyObject()
  @IsObject()
  departureAirport: IAirport;

  // @IsNotEmptyObject()
  @IsObject()
  arrivalAirport: IAirport;

  @IsOptional()
  @IsString()
  status: string;

  //@IsNotEmpty()
  @IsString()
  aircraftId: string;

  // //@IsNotEmpty()
  // @IsString()
  // aircraftManufacturer: string;

  // //@IsNotEmpty()
  // @IsString()
  // aircraftModel: string;

  // //@IsNotEmpty()
  // @IsString()
  // aircraftRegistrationNumber: string;

  //@IsNotEmpty()
  @IsString()
  arrivalDate: string;

  //@IsNotEmpty()
  @IsString()
  arrivalMeetingArea: string;

  //@IsNotEmpty()
  @IsString()
  arrivalMeetingTime: string;

  //@IsNotEmpty()
  @IsNumber()
  durationMinutes: number;

  //@IsNotEmpty()
  @IsBoolean()
  flexibleDate: boolean;

  //@IsNotEmpty()
  @IsBoolean()
  flexibleDepartureTime: boolean;

  //@IsNotEmpty()
  @IsBoolean()
  flexibleRouting: boolean;

  @IsObject()
  @IsOptional()
  checklist: IFlightChecklist;

  @IsArray()
  @IsOptional()
  notes: INote[];

  @IsString()
  //@IsNotEmpty()
  luggageWeightUnits: "kgs" | "lbs";

  @IsNumber()
  //@IsNotEmpty()
  maxLuggagePerPerson: number;

  // @IsNumber()
  // //@IsNotEmpty()
  // maxSeatsAvailable: number;

  @IsString()
  //@IsNotEmpty()
  meetingArea: string;

  @IsOptional()
  @IsString()
  meetingTime: string;

  //@IsNotEmpty()
  @IsNumber()
  offerExpiryHoursPriorToFlight: number;

  @IsString()
  //@IsNotEmpty()
  operatorId: string;

  // @IsArray()
  // @IsOptional()
  // passengers: IPassenger[];

  @IsNumber()
  @IsOptional()
  pricePerSeat: number;

  @IsString()
  @IsOptional()
  quotationId?: string;

  
  @IsObject()
  // @IsNotEmptyObject()
  auditFields: IAuditFields;

  @IsOptional()
  @IsNumber()
  totalFlightPrice: number;
  
  @IsOptional()
  @IsNumber()
  pricePerSeatWithPlatformFee: number;
    
}