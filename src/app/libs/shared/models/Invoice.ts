import { PaymentMethod } from "../enum/PaymentMethod";

export interface Invoice{
    id: string;
    code: string;
    date: Date;
    details: string;
    status: string;
    paymentMethod: PaymentMethod
}