import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/createBooking.dto';
import { UpdateBookingDto } from './dto/updateBooking.dto';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly service: BookingsService) {}

    @Post()
    create(@Body() createBookingDto: CreateBookingDto){
        return this.service.create(createBookingDto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Post('findInIdsArray')
    findInIdsArray(@Body() filter: any) {
        return this.service.findInIdsArray(filter);
    }

    @Post('filter')
    filter(@Body() query: object) {
        return this.service.findByFilter(query);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
        return this.service.update(id, dto);
    }
}
