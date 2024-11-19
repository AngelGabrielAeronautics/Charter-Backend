import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters,} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { IFlightSearchCriteria } from 'src/models/flight-search-criteria.model';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { ValidationErrorFilter } from 'src/validation-error.filter';

@Controller('flights')
export class FlightsController {
    constructor(private readonly service: FlightsService) { }

    @Post('search')
    search(@Body() criteria: IFlightSearchCriteria[]) {
        console.log("Flights ~ Controller ~ Search", criteria)
        return this.service.search(criteria);
    }

    @UseFilters(ValidationErrorFilter)
    @Post()
    create(@Body() createFlightDto: CreateFlightDto) {
       return this.service.create(createFlightDto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Post('filter')
    findByFilter(@Body() filter: any) {
        return this.service.findByFilter(filter);
    }

    @Post('findInIdsArray')
    findInIdsArray(@Body() filter: any) {
        return this.service.findInIdsArray(filter);
    }

    @Get('text-search/:criteria')
    textSearch(@Param('criteria') criteria: string) {
        console.log(criteria)
        return this.service.textSearch(criteria);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
        return this.service.update(id, updateFlightDto);
    }

    @Delete(':id')
    remove(id: string) {
        return this.service.remove(id);
    }

}
