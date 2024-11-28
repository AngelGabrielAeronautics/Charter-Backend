import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { Operator } from 'src/schemas/operator.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { OperatorUpdateEvent } from 'src/events/operator.events';
import { ESectionVettingStatus, IOperator } from './operator.model';
import { IFileInfo } from 'src/models/fileInfo.model';
import { IFile } from 'src/models/file.model';
import { VetOperatorDto } from './dto/vet-operator.dto';
import { SendEmailEvent } from 'src/events/notifications.events';

interface INotify {
  shouldNotify: boolean,
  status: "Unverified" | "Verified" | "Rejected",
  target: "operator" | "client" | "admin" | "agent",
  email: string

}

@Injectable()
export class OperatorsService {

  constructor(
    @InjectModel(Operator.name) private model: Model<Operator>,
    private readonly eventEmitter: EventEmitter2
  ) { }

  create(data: CreateOperatorDto) {
    const operator = new this.model(data);
    return operator.save();
  }

  async upload(file: IFile, id: string, key: string) {
    const doc = await this.model.findByIdAndUpdate(id, { [key]: file }, { new: true })

    if (!doc) {
      throw new HttpException('Not Found', HttpStatus.NOT_MODIFIED);
    }

    this.eventEmitter.emit('operator.update', new OperatorUpdateEvent(
      doc as unknown as IOperator
    ));

    return doc;
  }

  async uploadCertificate(certificate: IFileInfo, id: string, key: string) {
    const prevDoc = await this.model.findById(id);
    const certifications = {
      ...prevDoc.certifications,
      [key]: certificate
    }
    console.log("certifications", certifications)
    const nextDoc = await this.model.findByIdAndUpdate(id, { certifications }, { new: true })

    nextDoc.save();

    if (!nextDoc) {
      throw new HttpException('Not Found', HttpStatus.NOT_MODIFIED);
    }

    this.eventEmitter.emit('operator.update', new OperatorUpdateEvent(
      nextDoc as unknown as IOperator
    ));

    return nextDoc;
  }

  findAll() {
    return this.model.find();
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  async update(id: string, updateOperatorDto: UpdateOperatorDto) {
    const doc = await this.model.findByIdAndUpdate(id, updateOperatorDto, { new: true });

    if (!doc) {
      throw new HttpException('Not Found', HttpStatus.NOT_MODIFIED);
    }

    this.eventEmitter.emit('operator.update', new OperatorUpdateEvent(
      doc as unknown as IOperator
    ));

    return doc;
  }

  async vetProfileSection(id: string, dto: VetOperatorDto) {
    const doc = await this.model.findById(id);

    const { profileSection, vettingAction } = dto;

    const prevVettingStatus = doc.vettingStatus;
    doc.vettingStatus = {
      companyDetails: prevVettingStatus?.companyDetails ?? ESectionVettingStatus.pending,
      documentation: prevVettingStatus?.documentation ?? ESectionVettingStatus.pending,
      termsAndConditions: prevVettingStatus?.termsAndConditions ?? ESectionVettingStatus.pending,
      [profileSection]: vettingAction
    }
    const { companyDetails, documentation, termsAndConditions } = doc.vettingStatus;

    // console.log("companyDetails", companyDetails)
    // console.log("documentation", documentation)
    // console.log("termsAndConditions", termsAndConditions)
    let notify: INotify = {
      shouldNotify: false,
      status: "Unverified",
      target: "operator",
      email: doc.email
    }

    if (companyDetails.toString() == "approved" && documentation.toString() == "approved" && termsAndConditions.toString() == "approved") {
      // console.log("All Sections Approved")
      doc.status = "Verified"
      notify = {
        shouldNotify: true,
        status: "Verified",
        target: "operator",
        email: doc.email
      }
    } else if (companyDetails.toString() == "rejected" && documentation.toString() == "rejected" && termsAndConditions.toString() == "rejected") {
      // console.log("All Sections Rejected")
      doc.status = "Unverified";
      notify = {
        shouldNotify: true,
        status: "Rejected",
        target: "operator",
        email: doc.email
      }
    } else {
      // console.log("Not All Sections Approved")
      doc.status = "Unverified"
    }

    const updatedDoc = doc.save()

    const emailSubject = "Profile Status Changed";
    const templateName = "profile-status-changed";

    const payload = {
      newProfileStatus: notify.status
    }

    if (notify.shouldNotify) {
      // Sub-task LEV-1037: Send the email - Send operator email notification
      this.eventEmitter.emit('notification.sendEmail', new SendEmailEvent(
        [notify.email],
        emailSubject,
        notify.target,
        templateName,
        payload
      ));
    }

    // const doc = await this.model.findByIdAndUpdate(id, dto, { new: true });

    if (!updatedDoc) {
      throw new HttpException('Not Found', HttpStatus.NOT_MODIFIED);
    }

    // this.eventEmitter.emit('operator.update', new OperatorUpdateEvent(
    //   updatedDoc as unknown as IOperator
    // ));

    return updatedDoc;
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  @OnEvent('operator.update', { async: true })
  async profileCompletenessCheckHandler(payload: OperatorUpdateEvent) {
    console.log("profileCompletenessCheckHandler", payload)

    const fields = [
      'logo',
      'airline',
      'registrationNumber',
      'operatorCode',
      'country',
      'email',
      'phone',
      'vatNumber',
      'aocNumber',
      'address',
      // 'profileCompletePercentage',
      'responsiblePerson',
      'bankingDetails',
      'accountingResponsiblePerson',
      'certifications',
      'acceptedTermsAndConditions',
      'cancellationPolicy',
      'refundPolicy',
      'termsAndConditions',
    ];

    const operator: IOperator = payload.operator['_doc'];
    const keysNotFound: string[] = [];
    const foundFields = {};

    fields.forEach(field => foundFields[field] = operator[field]);

    Object.keys(foundFields).forEach((key: string) => {
      if (operator[key] === undefined || operator[key] === '') {
        keysNotFound.push(key);
      }

      if (key === 'certifications' && operator[key] !== undefined) {
        const certifications: IFileInfo[] = operator[key];
        if (certifications.length < 3) {
          keysNotFound.push(key);
        }
      }

    });

    // let percentageComplete: number = parseFloat(((fields.length % keysNotFound.length) / fields.length * 100).toFixed(2));
    // Correct percentage calculation
    const percentageComplete: number = parseFloat((((fields.length - keysNotFound.length) / fields.length) * 100).toFixed(2));

    await this.model.findByIdAndUpdate(payload.operator._id.toString(), {
      profileCompletePercentage: percentageComplete
    })

  }
}
