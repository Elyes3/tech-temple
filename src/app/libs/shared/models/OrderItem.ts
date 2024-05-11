import { OrderItemStatus } from "../enum/OrderItemStatus";
import { Invoice } from "./Invoice";
import { Product } from "./Product";

export interface OrderItem {
    id?: string;
    quantity: number;
    totalPrice: number;
    status: OrderItemStatus,
    product: Product,
}