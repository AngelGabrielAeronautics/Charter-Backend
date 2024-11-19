import { INotification } from "./entities/notification.model";

/**
 * notification.send
 */
export class SendNotification {
    constructor(
        public readonly notification: INotification,
    ) { }
}