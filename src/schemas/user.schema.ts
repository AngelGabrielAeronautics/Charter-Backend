import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IAddress } from 'src/models/address.model';
import { IFile } from 'src/models/file.model';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: false })
  firstNames?: string;

  @Prop({ required: false })
  lastName?: string;

  @Prop({ required: false })
  displayName?: string;

  @Prop({ type: Object, required: false })
  address?: IAddress;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: false, type: Object })
  photoUrl?: IFile;

  @Prop({ required: false })
  phoneNumber?: string;

  @Prop({ required: false })
  country?: string;

  @Prop({ required: false })
  operatorId?: string;

  @Prop({ required: false })
  agencyId?: string;

  @Prop({ required: false })
  provider?: string;

  @Prop({ required: true })
  fid: string;

  @Prop({ required: false })
  token?: string;

  @Prop({ required: false })
  lastLogin?: Date;

  @Prop({ required: false })
  role: 'Client' | 'Operator' | 'Agency' | 'Administrator' | 'Super User';

  @Prop({ required: false, type: mongoose.Types.ObjectId, ref: 'RolePermission' })
  rolePermissions?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);