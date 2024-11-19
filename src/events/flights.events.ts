import { IFlight, IFlightChecklist } from "src/flights/flight.model";
import { IQuotationRequest } from "src/quotation-requests/quotation-request.model";
import { IQuotation } from "src/quotations/quotation.model";

export class FlightFromQuotationRequest{
    constructor(
        public readonly flight: IFlight,
        public readonly quotationRequest: IQuotationRequest,
        public readonly quotation: IQuotation
    ){}
}

export class FlightChecklistUpdated{
    constructor(
        public readonly flightId: string,
        public readonly checklist: IFlightChecklist
    ){}
}