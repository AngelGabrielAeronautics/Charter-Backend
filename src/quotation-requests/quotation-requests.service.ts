import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { QuotationRequest } from 'src/quotation-requests/quotation-request.schema';
import { CreateQuotationRequest2Dto } from './dto/createQuotationRequest2.dto';
import { UpdateQuotationRequestDto } from './dto/updateQuotationRequest.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { QuotationRequestStatusEvent, QuotationStatusEvent } from 'src/events/quotation-events';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as moment from 'moment';
import { UsersService } from 'src/users/users.service';
import { NumberGeneratorService } from 'src/services/number-generator';


@Injectable()
export class QuotationRequestsService {

    constructor(
        @InjectModel(QuotationRequest.name) private model: Model<QuotationRequest>,
        private userModel: UsersService,
        private readonly eventEmitter: EventEmitter2,
        private readonly numberGeneratorService: NumberGeneratorService
    ) { }

    async create(dto: CreateQuotationRequest2Dto) {
        try {
            const { customerId, numberOfPassengers, ...rest } = dto;
            // Get user from customerId
            const customer = await this.userModel.findOne(customerId);

            // Parse numberOfPassengers properties to number
            const _numberOfPassengers = {
                adults: parseInt(`${numberOfPassengers.adults}`),
                children: parseInt(`${numberOfPassengers.children}`),
                infants: parseInt(`${numberOfPassengers.infants}`),
                total: parseInt(`${numberOfPassengers.total}`)
            }

            // Generate quotation request number
            const quotationRequestNumber = await this.numberGeneratorService.generateNumber('QR');

            if (customer && quotationRequestNumber) {
                const document = new this.model({
                    quotationRequestNumber,
                    customerId,
                    customer,
                    ...rest,
                    numberOfPassengers: _numberOfPassengers,
                    status: 'Pending',
                    auditFields: {
                        createdBy: customer.displayName,
                        createdById: customerId,
                        dateCreated: new Date()
                    },
                });

                return document.save();
            }
        } catch (err: any) {
            console.log(err)
        }
    }

    findAll() {
        return this.model.find();
    }

    findOne(id: string) {
        return this.model.findById(id);
    }

    async update(id: string, dto: UpdateQuotationRequestDto) {

        return await this.model.findByIdAndUpdate(id, dto, { new: true });
    }

    findByFilter(filter: any) {
        return this.model.find({ ...filter });
    }

    async findByCountry(country: string) {
        return await this.model.find({
            status: { $ne: 'Cancelled' },
            $or: [
                { 'trip.departureAirport.countryName': country },
                { 'trip.arrivalAirport.countryName': country }
            ]
        })
    }

    findByCustomerId(customerId: string) {
        return this.model.find({
            'customer._id': new Types.ObjectId(customerId) // Querying the embedded object's `_id`
        });
    }


    @OnEvent('quotation.status', { async: true })
    async onQuotationStatusEvent(payload: QuotationStatusEvent) {

        console.log("[ quotation.status - quotations-requests ] Triggered");

        const quotationRequestId: string = payload.quotation.quotationRequestId;
        if (payload.quotation.status === "Accepted") {
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

        const quotationRequests = await this.model
            .find({
                status: 'Pending',
            });

        const items: string[] = [];
        for (let i = 0; i < quotationRequests.length; i++) {
            const request = quotationRequests[i];
            const tripLegs = request.trip || [];

            let requestExpired = false;

            for (let index = 0; index < tripLegs.length; index++) {
                const tripLeg = tripLegs[index];

                const departureDate = moment(tripLeg.dateOfDeparture);
                const isExpired = departureDate.isSameOrAfter(now);
                console.log(isExpired, tripLeg.dateOfDeparture);

                if (isExpired) {
                    requestExpired = true;
                    break;
                }
            }

            if (requestExpired) items.push(request._id.toString());
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
