import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { AuditLogsService } from "src/audit-logs/audit-logs.service";
import { CreateAuditLogDto } from "src/audit-logs/dto/create-audit-log.dto";
import { IAuditLog } from "src/audit-logs/entities/audit-log.model";

@Injectable()
export class AuditLogInterceptor implements NestInterceptor{

    constructor(private auditLogService: AuditLogsService){}

    intercept(context: ExecutionContext, next: CallHandler<any>)
    : Observable<any> | Promise<Observable<any>> {
        
        const request = context.switchToHttp().getRequest();

        const {ip, method, path, body, headers} = request;

        const module = path.slice(1).split('/')[0];
        
        const { adn, adi } = headers
        
        // if(!adn || !adi){
        //     throw new ForbiddenException("Not Authorized");
        // }

        if(method !== 'GET' && adn && adi){

            const documentId = path.slice(1).split('/')[1];
            const actionType = this.getActionType(method);

            const userName = Buffer.from(adn, 'base64').toString();
            const userId = Buffer.from(adi, 'base64').toString();
            
            let auditLog: CreateAuditLogDto = {
                action: actionType,
                collectionName: module,
                documentId: documentId,
                description: `${actionType} ${module} by ${userName}`,
                userId: userId,
                requestBody: JSON.stringify(body),
                timestamp: new Date().toISOString(),
            }
            
            return next.handle()
            .pipe(
                tap((res) => {
                    const response = context.switchToHttp().getResponse();
                    const { statusCode } = response;

                    console.log(statusCode);
                    if(statusCode === 200 || statusCode === 201){
                        auditLog.newValue = JSON.stringify(res);
                    }
                    else{
                        auditLog.description = `Failed to ${actionType} resource ${module} by ${userName}`
                    }

                    this.logEvent(auditLog)

                })
            );

        }

        return next.handle();
    }

    private async logEvent(dto: CreateAuditLogDto){
        try{
            await this.auditLogService.create(dto);
        }
        catch(e){
            console.error(e)
        }
    }


    private getActionType(method: string)
    : 'Create' | 'Update' | 'Delete' {
        switch(method){
            case 'POST':
                return 'Create';
            case 'PATCH':
                return 'Update';
            case 'DELETE':
                return 'Delete';
        }
    } 



}