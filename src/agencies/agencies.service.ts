import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agency } from 'src/schemas/agency.schema';
import { CreateAgencyDto } from './dto/createAgency.dto';
import { UpdateAgencyDto } from './dto/updateAgency.dto';

@Injectable()
export class AgenciesService {

    constructor(@InjectModel(Agency.name) private model: Model<Agency> ) {}

    create(dto: CreateAgencyDto){
        const doc = new this.model(dto);
        return doc.save();
    }

    findAll(){
        return this.model.find();
    }

    findOne(id: string){
        return this.model.findById(id);
    }

    async update(id: string, dto: UpdateAgencyDto) {

        return await this.model.findByIdAndUpdate(id, dto, { new: true });
    }

    findByFilter(filter: any){
        return this.model.find({...filter});
    }
}
