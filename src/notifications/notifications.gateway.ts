import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from "socket.io";
import { SendNotification } from './notification.events';

@WebSocketGateway(8005, {
  cors: {
    credentials: true,
    origin: ['http://localhost:3000', `https://${process.env.PLATFORM_URL}`],
  }
}
)
export class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private readonly logger = new Logger(NotificationsGateway.name);

  @WebSocketServer() io: Server;

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  afterInit(server: any) {
    this.logger.log("Initialized");
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    this.logger.log(`Message received from client id: ${client.id}`);
    // this.logger.debug(`Payload: ${payload}`);
    console.log(payload);

  }

  @SubscribeMessage('subscribe')
  handleSubscription(client: any, payload: any) {
    this.logger.log(`subscribe received from client id: ${client.id}`);
    // this.logger.debug(`Payload: ${payload}`);
    console.log(payload);
    client.join(payload.id);
    client.join(payload.org);
    this.io.to(payload.id).emit('subscription-acknowledged', client.id);

  }

  @OnEvent('notification.send', { async: true })
  async handleSendNotificationEvent(payload: SendNotification) {
    this.logger.log('new notification');

    payload.notification.recipients.forEach(e => {
      this.io.to(e).emit('notification', payload.notification);
    });
  }
}
