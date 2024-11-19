import { Module } from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';
import { AuditLogsController } from './audit-logs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditLog, AuditLogSchema } from './entities/audit-log.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
        {
          name: AuditLog.name,
          schema: AuditLogSchema
        }
    ]),
  ],
  controllers: [AuditLogsController],
  providers: [AuditLogsService],
  exports: [
    AuditLogsService,
  ]
})
export class AuditLogsModule {}
