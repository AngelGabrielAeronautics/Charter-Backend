import { ConflictException, Injectable, UseGuards } from '@nestjs/common';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { RolePermission } from './entities/role-permission.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RolePermissionsService {

  constructor(
    @InjectModel(RolePermission.name) private model: Model<RolePermission>,
  ){}

  async create(dto: CreateRolePermissionDto) {
    try{
      const entity = new this.model(dto)
      return await entity.save();
    }
    catch(e){
      console.log();
      throw new ConflictException();
    }
  }

  async findAllByOrgId(id: string) {
    return await this.model.find({ organisation: id });
  }

  findAll() {
    return this.model.find();
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  async findByName(name: string) {
    return await this.model.findOne({ name: name });
  }

  async update(id: string, dto: UpdateRolePermissionDto) {
    return await this.model.findByIdAndUpdate(id, dto, { new: true });
  }

  async remove(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
}
