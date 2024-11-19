import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Post()
  create(@Body() dto: CreateNotificationDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
  
  @Get('recipient/:id')
  findByRecipient(@Param('id') id: string) {
    return this.service.findByRecipient(id);
  }

  @Post('filter')
  byFilyer(@Body() query: Object) {
      return this.service.findByFilter(query);
  }

  @Get('sender/:id')
  findBySender(@Param('id') id: string) {
    return this.service.findBySender(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNotificationDto) {
    return this.service.update(id, dto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
