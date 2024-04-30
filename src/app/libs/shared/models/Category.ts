import { Product } from "./Product";

export interface Category{
    id: string;
    name: string;
    description: string;
    message?: string;
    products: Product[]
}
