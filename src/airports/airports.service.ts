import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Airport } from 'src/schemas/airport.schema';

@Injectable()
export class AirportsService {
    constructor(@InjectModel(Airport.name) private airportModel: Model<Airport>) {}

    findAll(){
        //TODO:: Pagination
        return this.airportModel.find().limit(50);
    }

    findOne(id: string){
        return this.airportModel.findById(id);
    }

    search(term: string){
        return this.airportModel
        .find( { fullLabel: { "$regex": term , "$options": "i" } } ).limit(20);
    }

}
