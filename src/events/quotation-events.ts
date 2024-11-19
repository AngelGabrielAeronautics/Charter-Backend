import { IQuotationRequest } from "src/quotation-requests/quotation-request.model";
import { IQuotation } from "src/quotations/quotation.model";

export class QuotationStatusEvent{
    constructor(public readonly quotation: IQuotation){}
}

export class QuotationRequestStatusEvent{
    constructor(public readonly quotationRequest: IQuotationRequest, public readonly quotation: IQuotation){}
}