import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsArray, IsDateString, IsObject } from 'class-validator';

export class CreateNotificationDto {
    
    @IsString()
    @IsNotEmpty()
    topic: string;
    
    @IsString()
    @IsNotEmpty()
    message: string;

    @IsDateString()
    @IsOptional()
    timestamp?: string;

    @IsString()
    @IsNotEmpty()
    module: string;

    @IsBoolean()
    @IsOptional()
    read?: boolean;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    recipients: string[];

    @IsString()
    @IsOptional()
    sender?: string;

    @IsOptional()
    @IsObject()
    data?: any;
}
