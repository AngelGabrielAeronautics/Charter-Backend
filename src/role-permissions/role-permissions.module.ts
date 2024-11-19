import { Module } from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { RolePermissionsController } from './role-permissions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RolePermission, RolePermissionSchema } from './entities/role-permission.schema';
// import { UsersModule } from 'src/users/users.module';
// import { AbilityModule } from 'src/ability/ability.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: RolePermission.name,
      schema: RolePermissionSchema
    }]),
    // AbilityModule,
    // UsersModule,
    
    
  ],
  controllers: [RolePermissionsController],
  providers: [RolePermissionsService,],
  exports: [RolePermissionsService]
})
export class RolePermissionsModule {}
