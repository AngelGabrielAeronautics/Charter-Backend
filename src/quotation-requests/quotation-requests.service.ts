import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuotationRequest } from 'src/quotation-requests/quotation-request.schema';
import { CreateQuotationRequestDto } from './dto/createQuotationRequest.dto';
import { UpdateQuotationRequestDto } from './dto/updateQuotationRequest.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { QuotationRequestStatusEvent, QuotationStatusEvent } from 'src/events/quotation-events';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as moment from 'moment';


@Injectable()
export class QuotationRequestsService {

    constructor(
        @InjectModel(QuotationRequest.name) private model: Model<QuotationRequest>,
        private readonly eventEmitter: EventEmitter2
    ) {}

    create(dto: CreateQuotationRequestDto){
        const document = new this.model(dto);
        return document.save();
    }

    findAll(){
        return this.model.find();
    }

    findOne(id: string){
        return this.model.findById(id);
    }

    async update(id: string, dto: UpdateQuotationRequestDto) {

        return await this.model.findByIdAndUpdate(id, dto, { new: true });
    }

    findByFilter(filter: any){
        return this.model.find({...filter});
    }

    @OnEvent('quotation.status', { async: true })
    async onQuotationStatusEvent(payload: QuotationStatusEvent){
        
        console.log("[ quotation.status - quotations-requests ] Triggered");

        const quotationRequestId: string = payload.quotation.quotationRequestId;
        if(payload.quotation.status === "Accepted"){
            const request = await this.model.findByIdAndUpdate(
                quotationRequestId,
                { status: 'Fulfilled' }, { new: true }
            );

            this.eventEmitter.emit('quotation-request.status', new QuotationRequestStatusEvent(
                request,
                payload.quotation
            ));
            
        }
        //TODO: REJECTED status implementation
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleQuotationRequestsCron() {
        console.log('Running handleQuotationRequestsCron()');
        const now = moment()

        const quotationRquests = await this.model
        .find({
            status: 'Pending',
        });

        const items: string[] = [];
        for(let i = 0; i < quotationRquests.length; i++){
            const request = quotationRquests[i];
            const departureDate = moment(request.dateOfDeparture);
            const isExpired = departureDate.isSameOrAfter(now);
            console.log(isExpired, request.dateOfDeparture);

            if(isExpired) items.push(request._id.toString());
        }

        const writeOperations = items.map((item) => {
            return {
              updateOne: {
                filter: { _id: item },
                update: { status: 'Cancelled' }
              }
            };
        });

        await this.model.bulkWrite(writeOperations);
    }

}
