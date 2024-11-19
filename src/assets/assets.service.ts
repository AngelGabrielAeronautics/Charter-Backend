import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
// import dayjs from 'dayjs'
import { InjectModel } from '@nestjs/mongoose';
import { Asset } from 'src/schemas/asset.schema';
import { Model } from 'mongoose';
import { OperatorsService } from 'src/operators/operators.service';
import { IFile } from 'src/models/file.model';

@Injectable()
export class AssetsService {
  constructor(@InjectModel(Asset.name) private model: Model<Asset>, private readonly operatorsService: OperatorsService) { }

  async create(dto: CreateAssetDto) {
    const operator = await this.operatorsService.findOne(dto.operatorId);
    const existingAssets = await this.findByFilter({ registrationNumber: dto.registrationNumber })
    if (existingAssets.length > 0) {
      throw new BadRequestException('Asset with this registration number already exists')
    }
    return this.model.create({ ...dto, airline: operator.airline });
  }

  async upload(file: IFile, id: string, key: string) {
    return await this.model.findByIdAndUpdate(
      id,
      { "$push": { [key]: file } },
      { new: true, "upsert": true }
    );
  }

  findAll() {
    return this.model.find();
  }

  findByFilter(filter: any) {
    return this.model.find({ ...filter });
  }

  findOne(id: string) {
    const asset = this.model.findById(id);
    if (!asset) {
      throw new NotFoundException(`Asset with ID ${id} not found`);
    }
    return asset;
  }

  update(id: string, updateAssetDto: UpdateAssetDto) {
    this.model.findByIdAndUpdate(id, updateAssetDto);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
