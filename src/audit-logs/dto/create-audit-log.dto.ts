import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAuditLogDto {

    @IsNotEmpty()
    @IsString()
    action: 'Create' | 'Update' | 'Delete';

    @IsNotEmpty()
    @IsString()
    collectionName: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    newValue?: string;

    @IsOptional()
    @IsString()
    requestBody?: string;

    @IsNotEmpty()
    @IsString()
    documentId: string;
    
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsDateString()
    timestamp: string;

    @IsOptional()
    @IsString()
    organisation?: string;
}
