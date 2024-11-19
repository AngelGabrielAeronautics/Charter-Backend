import { IOperator } from "src/operators/operator.model";

export class OperatorUpdateEvent{
    constructor(public readonly operator: IOperator){}
}