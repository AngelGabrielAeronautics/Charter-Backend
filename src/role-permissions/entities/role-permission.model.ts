export interface IRolePermission{
    name: string;
    modules: IModulePermission[];
    organisation: string;   
}

export interface IModulePermission{
    name: string;
    permissions: IAppPermission[];
}

export enum IAppPermission {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}