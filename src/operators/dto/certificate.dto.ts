import { IsOptional, IsString } from "class-validator"

export class CertificateDto {
    @IsString()
    documentName: string;

    @IsString()
    dateUploaded: Date;

    @IsOptional()
    @IsString()
    expirationDate?: Date;

    @IsString()
    status: string;
}
