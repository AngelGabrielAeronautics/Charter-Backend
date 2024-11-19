import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsOptional()
  firstNames?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  operatorId?: string;

  @IsString()
  @IsOptional()
  agencyId?: string;

  @IsString()
  @IsOptional()
  token?: string;

  @IsDate()
  @IsOptional()
  lastLogin?: Date;

  @IsString()
  @IsNotEmpty()
  fid: string;

  @IsString()
  @IsNotEmpty()
  provider: 'google' | 'facebook' | 'email';

  @IsString()
  @IsOptional()
  role: 'Client' | 'Operator' | 'Agency' | 'Administrator' | 'Super User';

  @IsString()
  @IsOptional()
  rolePermissions?: string[];
}
