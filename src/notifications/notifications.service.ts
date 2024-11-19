import { Injectable, Logger } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './entities/notification.schema';
import { OnEvent } from '@nestjs/event-emitter';
import { SendNotification } from './notification.events';
import { HttpService } from '@nestjs/axios';
import { IOneSignalEmailPayload } from './entities/notification.model';
import { SendEmailEvent } from 'src/events/notifications.events';
import * as handlebars from 'handlebars';
import { getEmailTemplate } from './email.helper';

@Injectable()
export class NotificationsService {

  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectModel(Notification.name) private model: Model<Notification>,
    private readonly http: HttpService,
  ) { }

  async create(dto: CreateNotificationDto) {
    const newUser = new this.model(dto);
    return await newUser.save();
  }

  findAll() {
    return this.model.find();
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  findByRecipient(id: string) {
    return this.model.find({ recipients: id });
  }

  findBySender(id: string) {
    return this.model.find({ sender: id });
  }

  async update(id: string, dto: UpdateNotificationDto) {
    return await this.model.findByIdAndUpdate(id, dto, { new: true });
  }

  async remove(id: string) {
    return await this.model.findByIdAndDelete(id);
  }

  @OnEvent('notification.send', { async: true })
  handleSendNotificationEvent(payload: SendNotification) {
    const dto: CreateNotificationDto = {
      ...payload.notification,
      timestamp: payload.notification.timestamp.toISOString()
    }
    this.create(dto);
  }

  @OnEvent('notification.sendEmail', { async: true })
  async sendEmail(data: SendEmailEvent) {

    const requestHeaders = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": `Bearer token= ${process.env.ONESIGNAL_REST_API_KEY}`,
      "Accept": "application/json",
    }

    const emailTemplate = getEmailTemplate(data.target, data.template);
    const template = handlebars.compile(emailTemplate);
    const body = (template(data.templateData));

    const payload: IOneSignalEmailPayload = {
      app_id: process.env.ONESIGNAL_APP_ID,
      include_email_tokens: data.toEmailAddress,
      email_subject: data.subject,
      email_body: body,
    }

    this.http
      .post(
        process.env.ONESIGNAL_API_ENDPOINT,
        payload,
        {
          headers: requestHeaders
        }
      ).subscribe((res) => {
        this.logger.log('Email Sent with id: ', res.data.id);
      });

  }

  findByFilter(filter: any) {
    return this.model.find({ ...filter });
  }

}
