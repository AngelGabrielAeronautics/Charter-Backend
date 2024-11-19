import { Injectable } from '@nestjs/common';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AuditLog } from './entities/audit-log.shema';
import { Model } from 'mongoose';

@Injectable()
export class AuditLogsService {
  
  constructor(
    @InjectModel(AuditLog.name) private model: Model<AuditLog>,
  ){}
  
  async create(dto: CreateAuditLogDto){
    const doc = new this.model(dto);
    return await doc.save();
  }

  findAll(){
    return this.model.find();
  }

  findOne(id: string){
    return this.model.findById(id);
  }

  async update(id: string, dto: UpdateAuditLogDto) {
    return await this.model.findByIdAndUpdate(id, dto, { new: true });
  }

  async findByFilter(filter: any){
    return await this.model.find(filter);
  }

  async remove(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
}
