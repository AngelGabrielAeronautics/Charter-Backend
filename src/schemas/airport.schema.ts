import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AirportDocument = HydratedDocument<Airport>;

@Schema()
export class Airport{
    @Prop({ required: true })
    airportId : string;

    @Prop({ required: true })
    airportName: string;

    @Prop({ required: true })
    cityIataCode: string;

    @Prop({ required: true })
    countryIso2: string;

    @Prop({ required: true })
    countryName: string;

    @Prop({ required: true })
    fullLabel: string;

    @Prop({ required: true })
    geoname_id: number;

    @Prop({ required: true })
    gmt: number;

    @Prop({ required: true })
    iataCode: string;

    @Prop({ required: true })
    icaoCode: string;

    @Prop({ required: true })
    id: number;

    @Prop({ required: true })
    latitude: number;

    @Prop({ required: true })
    longitude: number;

    @Prop({ required: false })
    phoneNumber?: string;

    @Prop({ required: true })
    shortLabel: string;

    @Prop({ required: true })
    timezone: string;

    @Prop({ required: true })
    flag: string;
}

export const AirportSchema = SchemaFactory.createForClass(Airport);