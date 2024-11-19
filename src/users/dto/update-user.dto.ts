import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IAddress } from 'src/models/address.model';
import { IsObject, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsObject()
  @IsOptional()
  address?: IAddress;
}
