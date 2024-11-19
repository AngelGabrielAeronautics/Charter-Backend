import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTeamMemberDto {

    @IsNotEmpty()
    @IsString()
    firstNames: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    displayName: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    operatorId?: string;

    @IsOptional()
    @IsString()
    agencyId?: string;

    @IsNotEmpty()
    @IsString()
    role: 'Client' | 'Operator' | 'Agency' | 'Administrator' | 'Super User';

    @IsNotEmpty()
    @IsArray()
    rolePermissions: string[];
}