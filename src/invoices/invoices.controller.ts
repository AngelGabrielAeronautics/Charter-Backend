import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { UpdateInvoiceDto } from './dto/updateInvoice.dto';

@Controller('invoices')
export class InvoicesController {
    constructor(private readonly service: InvoicesService) {}

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateInvoiceDto) {
        return this.service.update(id, dto);
    }

    @Post('status/:id')
    updateStatus(@Param('id') id: string, @Body() body: { status: 'Paid' | 'Due' | 'Cancelled' }) {
        return this.service.statusUpdate(id, body.status);
        // return this.service.updateStatus(id, body.status);
    }

    @Post('filter')
    findByFilter(@Body() filter: any){
        return this.service.findByFilter(filter);
    }

}
