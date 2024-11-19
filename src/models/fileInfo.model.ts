import { IFile } from "./file.model"

export interface IFileInfo {
    documentName: string;
    dateUploaded: Date;
    expirationDate?: Date;
    file: IFile;
    status: string;
}