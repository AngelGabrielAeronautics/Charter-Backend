export class InvoiceStatusChangeEvent{
    
    constructor(
        public readonly status: string,
        public readonly flightId: string,
        public readonly bookingId: string,
        public readonly customerId: string,
    ){

    }

}