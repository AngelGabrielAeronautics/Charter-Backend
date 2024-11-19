import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';

@Controller('dashboards')
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}


  @Get('admin')
  adminStats() {
    return this.dashboardsService.generateAdminStats();
  }

  @Get('operator/:id')
  operatorStats(@Param('id') id: string) {
    return this.dashboardsService.generateOperatorStats(id);
  }

}
