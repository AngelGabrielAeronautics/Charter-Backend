import { INotification } from "src/notifications/entities/notification.model";

/**
 * notification.sendEmail
 */
export class SendEmailEvent{
    constructor(
        public readonly toEmailAddress: string[],
        public readonly subject: string,
        public readonly target: "client" | "operator" | "admin" | "agent",
        public readonly template: string,
        public readonly templateData: any,
    ){}
}