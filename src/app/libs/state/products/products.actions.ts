import { Action } from "@ngrx/store";
import { PaginationInfo } from "../../dashboard/shared/PaginationInfo";
import { Product } from "../../shared/models/Product";

export enum ProductsActionTypes {
    LoadProductsWithPaginationAndSort = '[Products] Load Products with Pagination and Sort',
    ProductsWithPaginationAndSortLoaded = '[Products] Products with Pagination and Sort Loaded',
    LoadProducts = '[Products] Load Products',
    ProductsLoaded = '[Products] Products Loaded',
    AddProduct = '[Products] Add Product',
    ProductAdded = '[Products] Product Added',
    DeleteProduct = '[Products] Delete Product',
    ProductDeleted = '[Products] Product Deleted',
    UpdateProduct = '[Products] Update Product',
    ProductUpdated = '[Products] Product Updated',
}
export class LoadProductsWithPaginationAndSort implements Action{
    readonly type = ProductsActionTypes.LoadProductsWithPaginationAndSort
    constructor(public payload : PaginationInfo){}
}
export class ProductsWithPaginationAndSortLoaded implements Action{
    readonly type = ProductsActionTypes.ProductsWithPaginationAndSortLoaded
    constructor(public payload : Product[]){}
}
export class LoadProducts implements Action{
    readonly type = ProductsActionTypes.LoadProducts;
    constructor() { }
}
export class ProductsLoaded implements Action{
    readonly type = ProductsActionTypes.ProductsLoaded;
    constructor(public payload: Product[]){ }
}
export class AddProduct implements Action{
    readonly type = ProductsActionTypes.AddProduct;
    constructor(public payload: Product){ }
}
export class ProductAdded implements Action{
    readonly type = ProductsActionTypes.ProductAdded;
    constructor(public payload: Product){ }
}
export class UpdateProduct implements Action{
    readonly type = ProductsActionTypes.UpdateProduct;
    constructor (public payload : Product){ }
}
export class ProductUpdated implements Action{
    readonly type = ProductsActionTypes.ProductUpdated;
    constructor (public payload : Product){ }
}
export class DeleteProduct implements Action{
    readonly type = ProductsActionTypes.DeleteProduct;
    constructor (public payload : Product){ }
}
export class ProductDeleted implements Action{
    readonly type = ProductsActionTypes.ProductDeleted;
    constructor (public payload : Product){ }
}
export type ProductsActions = 
    | LoadProductsWithPaginationAndSort
    | ProductsWithPaginationAndSortLoaded
    | LoadProducts
    | ProductsLoaded
    | AddProduct
    | ProductAdded
    | UpdateProduct
    | ProductUpdated
    | DeleteProduct
    | ProductDeleted
