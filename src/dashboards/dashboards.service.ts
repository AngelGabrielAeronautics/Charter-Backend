import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from 'src/bookings/booking.schema';
import { Flight } from 'src/flights/flight.schema';
import { QuotationRequest } from 'src/quotation-requests/quotation-request.schema';
import { Quotation } from 'src/quotations/quotation.schema';
import { Asset } from 'src/schemas/asset.schema';
import { Operator } from 'src/schemas/operator.schema';
import { IAdminStats, IOperatorStats } from './entities/dashboard.model';

@Injectable()
export class DashboardsService {

  constructor(
    @InjectModel(Flight.name) private flightModel: Model<Flight>, 
    @InjectModel(Booking.name) private bookingModel: Model<Booking>, 
    @InjectModel(Asset.name) private assetModel: Model<Asset>, 
    @InjectModel(QuotationRequest .name) private quotationRequestModel: Model<QuotationRequest>, 
    @InjectModel(Quotation.name) private quotationModel: Model<Quotation>, 
    @InjectModel(Operator.name) private operatorModel: Model<Operator>,
  ){}
  
  async generateAdminStats(){


    const requests = await Promise.all([
      this.assetModel.aggregate([
        {
          $group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same age, MongoDB will increment `count`.
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]),
      this.flightModel.aggregate([
        {
          $group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same age, MongoDB will increment `count`.
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]),
      this.quotationModel.aggregate([
        {
          $group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same age, MongoDB will increment `count`.
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]),
      this.quotationRequestModel.aggregate([
        {
          $group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same age, MongoDB will increment `count`.
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]),
      this.bookingModel.aggregate([
        {
          $group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same age, MongoDB will increment `count`.
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]),
      this.operatorModel.aggregate([
        {
          $group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same age, MongoDB will increment `count`.
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]),
      
    ]);

    const statProperities = [
      'assets',
      'deadLegs',
      'quotations',
      'quotationRequests',
      'bookings',
      'operators',
    ]

    const stats: IAdminStats = {
      assets: {
        drafts: 0,
        active: 0,
        total: 0
      },
      deadLegs: {
        offered: 0,
        cancelled: 0,
        expired: 0,
        ready: 0,
        completed: 0,
        total: 0
      },
      quotations: {
        accepted: 0,
        submitted: 0,
        rejected: 0,
        total: 0
      },
      quotationRequests: {
        fulfilled: 0,
        pending: 0,
        quoted: 0,
        cancelled: 0,
        total: 0
      },
      bookings: {
        pending: 0,
        invoiced: 0,
        paid: 0,
        cancelled: 0,
        total: 0
      },
      operators: {
        verified: 0,
        unverified: 0,
        total: 0
      }
    }

    for(let i = 0; i < statProperities.length; i++){
      let currentProperty = stats[statProperities[i]];
      
      const docs = requests[i];
      
      docs.forEach( (doc) => {
        try{
          const key = doc._id.toLowerCase();
          currentProperty[key] = doc.count;
        }
        catch(e){
          console.log('')
        }
      });

      currentProperty.total = docs.map( (e) => e.count ).reduce((partialSum, a) => partialSum + a, 0);
      stats[statProperities[i]] = {...currentProperty};
    }

    return stats;
  }

  async generateOperatorStats(id: string){

    const matchQuery = { $match: { operatorId: { $eq: id } } };
    const requests = await Promise.all([
      this.assetModel.aggregate([
        matchQuery,
        {
          $group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same age, MongoDB will increment `count`.
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]),
      this.flightModel.aggregate([
        matchQuery,
        {
          $group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same age, MongoDB will increment `count`.
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]),
      this.quotationModel.aggregate([
        matchQuery,
        {
          $group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same age, MongoDB will increment `count`.
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]),
      this.quotationRequestModel.aggregate([
        { $match: { status: { $eq: 'Pending' } } },
        {
          $group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same age, MongoDB will increment `count`.
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]),
      this.bookingModel.aggregate([
        {
          $group: {
            // Each `_id` must be unique, so if there are multiple
            // documents with the same age, MongoDB will increment `count`.
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]),
    ]);

    const statProperities = [
      'assets',
      'deadLegs',
      'quotations',
      'quotationRequests',
      'bookings',
    ]

    const stats: IOperatorStats = {
      assets: {
        drafts: 0,
        active: 0,
        total: 0
      },
      deadLegs: {
        offered: 0,
        cancelled: 0,
        expired: 0,
        ready: 0,
        completed: 0,
        total: 0
      },
      quotations: {
        accepted: 0,
        submitted: 0,
        rejected: 0,
        total: 0
      },
      quotationRequests: {
        total: 0
      },
      bookings: {
        pending: 0,
        invoiced: 0,
        paid: 0,
        cancelled: 0,
        total: 0
      },
    }

    for(let i = 0; i < statProperities.length; i++){
      let currentProperty = stats[statProperities[i]];
      
      const docs = requests[i];
      
      docs.forEach( (doc) => {
        try{
          const key = doc._id.toLowerCase();
          currentProperty[key] = doc.count;
        }
        catch(e){
          console.log('')
        }
      });

      currentProperty.total = docs.map( (e) => e.count ).reduce((partialSum, a) => partialSum + a, 0);
      stats[statProperities[i]] = {...currentProperty};
    }

    return stats;
  }
}
