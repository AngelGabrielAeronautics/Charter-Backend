import { IAddress } from "src/models/address.model";

export interface IUser{
    _id?: string;
    firstNames?: string;
    lastName?: string;
    displayName?: string;
    email: string;
    address?: IAddress;
    operatorId?: string;
    phoneNumber?: string;
    country?: string;
    provider?: AuthProvider;
    agencyId?: string;
    fid?: string;
    role?: 'Client' | 'Operator' | 'Agency' | 'Administrator' | 'Super User';
    rolePermissions?: string[];
}

export enum AuthProvider {
    'google',
    'facebook',
    'email',
}

export interface IFederatedUser{
    _id?: string;
    displayName?: string;
    email: string;
    operatorId?: string;
    phoneNumber?: string;
    provider: 'google' | 'facebook' | 'email';
    agencyId?: string;
    fid: string;
    role?: 'Client' | 'Operator' | 'Agency' | 'Administrator' | 'Super User';
}