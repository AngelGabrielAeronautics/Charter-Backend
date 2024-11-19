import { Body, Controller, Post, Get, Param, Patch } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/createTicket.dto';
import { UpdateTicketDto } from './dto/updateTicket.dto';

@Controller('tickets')
export class TicketsController {

    constructor(private readonly service: TicketsService) {}

    @Post()
    create(@Body() dto: CreateTicketDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }
    
    @Get('populated/')
    findAllWithBookingDetails() {
        return this.service.findPopulated();
    }

    @Post('filter')
    filter(@Body() query: Object) {
        return this.service.findByFilter(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateTicketDto) {
        return this.service.update(id, dto);
    }

}
