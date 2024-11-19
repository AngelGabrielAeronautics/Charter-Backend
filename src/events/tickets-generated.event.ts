import { ITicket } from "src/tickets/ticket.model";

export class TicketsGeneratedEvent{
    constructor(public readonly tickets: ITicket[], public readonly flightId: string){}
}