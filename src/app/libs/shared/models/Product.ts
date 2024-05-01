import { Category } from "./Category";
import { OrderItemStatus } from "../enum/OrderItemStatus";
export interface Product{
    id: string;
    name: string;
    description: string;
    productCategory: Category;
    price: number;
    brand: string;
    status: OrderItemStatus;
    img1: string | null;
    img2: string | null;
    img3: string | null;
    img4: string | null;
}