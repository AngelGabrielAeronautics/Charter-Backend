import { IAirport } from "src/airports/airport.model"
import { IAuditFields } from "src/models/audit-fields.model"
import { IContactDetails } from "src/models/contact.model"
import { INote } from "src/models/notes.model"
import { IPerson } from "src/models/person.model"
import { ITripDetailsItem } from "src/quotations/quotation.model"

export interface IFlight {
  _id?: string;
  airline: string;
  capacity: number;
  departure: Date;
  duration: number;
  flightNumber: string;
  departureAirport: IAirport;
  arrivalAirport: IAirport;
  status: string; // Offered |  | Ready 
  aircraftId: string;
  aircraftManufacturer: string;
  aircraftModel: string;
  aircraftRegistrationNumber: string;
  arrivalDate: Date;
  arrivalMeetingArea: string;
  arrivalMeetingTime: string;
  durationMinutes: number;
  flexibleDate: boolean;
  flexibleDepartureTime: boolean;
  flexibleRouting: boolean;
  checklist: IFlightChecklist;
  notes: INote[];
  luggageWeightUnits: "kgs"|"lbs";
  maxLuggagePerPerson: number;
  maxSeatsAvailable: number;
  meetingArea: string;
  meetingTime: Date;
  offerExpiryHoursPriorToFlight: number;
  operatorId: string;
  passengers: IPassenger[];
  pricePerSeat: number; // With platform fee

  totalFlightPrice: number;
  pricePerSeatWithPlatformFee: number;
  trip: ITripDetailsItem[];

  quotationId?: string;
  auditFields: IAuditFields;
}

export interface IPassenger extends IPerson {
  paid: boolean;
  contactDetails?: IContactDetails;
  isLead: boolean; // Default to false
}

export interface IFlightChecklist {
  adminNotes: INote[],
  aircraftBooked: boolean,
  airportHandler: boolean;
  allPaymentsReceived: boolean,
  arrivalAndIndemnity: boolean,
  catering: boolean;
  crewAccommodation: boolean;
  issuedAllTickets?: boolean,
  roadShuttle: boolean
  supplierPaid: boolean, // Has the operator been paid
}