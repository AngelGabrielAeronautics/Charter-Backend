import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { QuotationsService } from './quotations.service';
import { CreateQuotationDto } from './dto/createQuotation.dto';
import { UpdateQuotationDto } from './dto/updateQuotation.dto';

@Controller('quotations')
export class QuotationsController {
    constructor(private readonly service: QuotationsService) {}

    @Post()
    create(@Body() dto: CreateQuotationDto) {
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
    findOne(@Param('id') id: string){
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateQuotationDto) {
        return this.service.update(id, dto);
    }
}
