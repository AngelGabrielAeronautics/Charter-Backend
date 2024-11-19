export interface INotification {
    _id?: string;
    topic: string;
    message: string;
    timestamp: Date;
    module: string;
    read: boolean;
    recipients: string[]; // list of user IDs for one or more recipients
    sender?: string; // optional sender ID / Name
    data?: any; // optional additional data as Object 
  }

  export interface IOneSignalEmailPayload{
      app_id: string;
      include_email_tokens: string[];
      email_subject: string;
      email_body: string;
  }