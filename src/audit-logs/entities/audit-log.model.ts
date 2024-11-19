
export interface IAuditLog {
    action: 'Create' | 'Update' | 'Delete';
    collectionName: string;
    description: string;
    newValue?: string;
    requestBody?: string;
    documentId: string;
    userId: string;
    timestamp: Date;
    organisation?: string;
}