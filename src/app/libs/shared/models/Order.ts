import { User } from "../../auth/shared/User";
import { OrderStatus } from "../enum/OrderStatus";
import { Invoice } from "./Invoice";
import { OrderItem } from "./OrderItem";

export interface Order{
    id: string;
    status: OrderStatus;
    placedDate: Date;
    code: string;
    invoice: Invoice | null,
    customer: User,
    orderItems: OrderItem[]
}