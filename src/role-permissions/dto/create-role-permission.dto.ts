import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IModulePermission } from "../entities/role-permission.model";

export class CreateRolePermissionDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsArray()
    modules: IModulePermission[];

    @IsNotEmpty()
    @IsString()
    organisation: string;
}
