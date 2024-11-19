import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { IAirport } from "src/airports/airport.model";
import { IFlightChecklist, IPassenger } from "src/flights/flight.model";
import { IAuditFields } from "src/models/audit-fields.model";
import { INote } from "src/models/notes.model";

export type FlightDocument = HydratedDocument<Flight>;

@Schema()
export class Flight {

    @Prop({ required: true })
    airline: string;

    @Prop({ required: true })
    capacity: number;

    @Prop({ required: true })
    departure: Date;

    @Prop({ required: true })
    duration: number;

    @Prop({ required: false })
    flightNumber: string;

    @Prop({ required: true, type: Object })
    departureAirport: IAirport;

    @Prop({ required: true, type: Object })
    arrivalAirport: IAirport;

    @Prop({ required: true })
    status: string;

    @Prop({ type: Types.ObjectId, ref: 'Asset', required: true })
    aircraftId: Types.ObjectId;

    @Prop({ required: true })
    aircraftManufacturer: string;

    @Prop({ required: true })
    aircraftModel: string;

    @Prop({ required: true })
    aircraftRegistrationNumber: string;

    @Prop({ required: true })
    arrivalDate: Date;

    @Prop({ required: true })
    arrivalMeetingArea: string;

    @Prop({ required: true })
    arrivalMeetingTime: string;

    @Prop({ required: true })
    durationMinutes: number;

    @Prop({ required: true })
    flexibleDate: boolean;

    @Prop({ required: true })
    flexibleDepartureTime: boolean;

    @Prop({ required: true })
    flexibleRouting: boolean;

    @Prop({ required: true, type: Object })
    checklist: IFlightChecklist;

    @Prop({ required: true, type: Array, default: [] })
    notes: INote[];

    @Prop({ required: true })
    luggageWeightUnits: "kgs" | "lbs";

    @Prop({ required: true })
    maxLuggagePerPerson: number;

    @Prop({ required: true })
    maxSeatsAvailable: number;

    @Prop({ required: true })
    meetingArea: string;

    @Prop({ required: true })
    meetingTime: Date;

    @Prop({ required: true })
    offerExpiryHoursPriorToFlight: number;

    @Prop({ type: Types.ObjectId, ref: 'Operator', required: true })
    operatorId: Types.ObjectId;

    @Prop({ required: true, type: Array, default: [] })
    passengers: IPassenger[];

    @Prop({ required: true })
    pricePerSeat: number;

    @Prop({ required: true })
    pricePerSeatWithPlatformFee: number;

    @Prop({ required: true })
    totalFlightPrice: number;

    @Prop({ required: false })
    quotationId?: string;

    @Prop({ required: true, type: Object })
    auditFields: IAuditFields;

}

export const FlightSchema = SchemaFactory.createForClass(Flight);

FlightSchema.index({
    name: 'text',
    flightNumber: 'text',
    "departureAirport.fullLabel": 'text',
    "arrivalAirport.fullLabel": 'text',
    aircraftModel: 'text'
})

// Define the virtual field
FlightSchema.virtual('operator', {
    ref: 'Operator',
    localField: 'operatorId',
    foreignField: '_id',
    justOne: true, // Since it's a one-to-one relationship
});

// Define the virtual field
FlightSchema.virtual('aircraft', {
    ref: 'Asset',
    localField: 'aircraftId',
    foreignField: '_id',
    justOne: true, // Since it's a one-to-one relationship
});

FlightSchema.set('toJSON', {
    virtuals: true,
});