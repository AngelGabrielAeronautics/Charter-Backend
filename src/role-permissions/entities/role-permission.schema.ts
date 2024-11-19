import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from "mongoose";
import { IModulePermission } from './role-permission.model';

export type RolePermissionDocument = HydratedDocument<RolePermission>;

@Schema()
export class RolePermission {

    @Prop({ required: true,})
    name: string;

    @Prop({ required: true, type: Array<Object> })
    modules: IModulePermission[];

    @Prop({ required: true})
    organisation: string;
}

export const RolePermissionSchema = SchemaFactory.createForClass(RolePermission);