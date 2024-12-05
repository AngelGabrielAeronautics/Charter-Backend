import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { QuotationRequestsService } from './quotation-requests.service';
import { CreateQuotationRequest2Dto } from './dto/createQuotationRequest2.dto';
import { UpdateQuotationRequestDto } from './dto/updateQuotationRequest.dto';

@Controller('quotation-requests')
export class QuotationRequestsController {

    constructor(private readonly service: QuotationRequestsService) {}

    @Post()
    create(@Body() dto: CreateQuotationRequest2Dto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Post('filter')
    filter(@Body() query: object) {
        return this.service.findByFilter(query);
    }

    @Post('findByCountry')
    findByCountry(@Body() payload: any) {
        return this.service.findByCountry(payload.country);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateQuotationRequestDto) {
        return this.service.update(id, dto);
    }

}
