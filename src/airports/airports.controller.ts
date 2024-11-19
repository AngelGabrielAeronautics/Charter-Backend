import { Controller, Get, Param } from '@nestjs/common';
import { AirportsService } from './airports.service';

@Controller('airports')
export class AirportsController {

    constructor(private readonly airportsService: AirportsService){}

    @Get('search/:term')
    search(@Param('term') term: string){
        return this.airportsService.search(term);
    }

    @Get()
    findAll(){
        return this.airportsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.airportsService.findOne(id);
    }
}
