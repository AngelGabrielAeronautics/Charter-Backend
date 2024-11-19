import { Body, Controller, Param, Patch, Post, Get } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { CreateAgencyDto } from './dto/createAgency.dto';
import { UpdateAgencyDto } from './dto/updateAgency.dto';

@Controller('agencies')
export class AgenciesController {

    constructor(private readonly service: AgenciesService) {}

    @Post()
    create(@Body() dto: CreateAgencyDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
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
    update(@Param('id') id: string, @Body() dto: UpdateAgencyDto) {
        return this.service.update(id, dto);
    }
}
