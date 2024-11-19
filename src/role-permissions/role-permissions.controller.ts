import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
// import { AbilitiesGuard } from 'src/ability/abilities.guard';

@Controller('role-permissions')
export class RolePermissionsController {
  constructor(private readonly rolePermissionsService: RolePermissionsService) {}

  // @UseGuards(AbilitiesGuard)
  @Post()
  create(@Body() createRolePermissionDto: CreateRolePermissionDto) {
    return this.rolePermissionsService.create(createRolePermissionDto);
  }

  // @UseGuards(AbilitiesGuard)
  @Get()
  findAll() {
    return this.rolePermissionsService.findAll();
  }

  @Get('by-organisation/:id')
  finAllByOrgId(@Param('id') id: string) {
    return this.rolePermissionsService.findAllByOrgId(id);
  }
  
  // @UseGuards(AbilitiesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolePermissionsService.findOne(id);
  }

  // @UseGuards(AbilitiesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolePermissionDto: UpdateRolePermissionDto) {
    return this.rolePermissionsService.update(id, updateRolePermissionDto);
  }

  // @UseGuards(AbilitiesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolePermissionsService.remove(id);
  }
}
