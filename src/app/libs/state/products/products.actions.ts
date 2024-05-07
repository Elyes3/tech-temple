import { Action } from "@ngrx/store";
import { PaginationInfo } from "../../dashboard/shared/PaginationInfo";
import { Product } from "../../shared/models/Product";

export enum ProductsActionTypes {
    LoadProductsWithPaginationAndSort = '[Products] Load Products with Pagination and Sort',
    ProductsWithPaginationAndSortLoaded = '[Products] Products with Pagination and Sort Loaded',
    LoadProductsWithPaginationAndSortError = '[Products] Load Products with Pagination and Sort Error',
    LoadProducts = '[Products] Load Products',
    ProductsLoaded = '[Products] Products Loaded',
    LoadProductsError = '[Products] Load Products Error',
    AddProduct = '[Products] Add Product',
    ProductAdded = '[Products] Product Added',
    AddProductError = '[Products] Add Product Error',
    DeleteProduct = '[Products] Delete Product',
    ProductDeleted = '[Products] Product Deleted',
    DeleteProductError = '[Products] Delete Product Error',
    UpdateProduct = '[Products] Update Product',
    ProductUpdated = '[Products] Product Updated',
    UpdateProductError = '[Products] Update Product Error',
}
export class LoadProductsWithPaginationAndSort implements Action{
    readonly type = ProductsActionTypes.LoadProductsWithPaginationAndSort
    constructor(public payload : PaginationInfo){}
}
export class ProductsWithPaginationAndSortLoaded implements Action{
    readonly type = ProductsActionTypes.ProductsWithPaginationAndSortLoaded
    constructor(public payload : Product[]){}
}
export class LoadProductsWithPaginationAndSortError implements Action{
    readonly type = ProductsActionTypes.LoadProductsWithPaginationAndSortError
    constructor(){}
}
export class LoadProducts implements Action{
    readonly type = ProductsActionTypes.LoadProducts;
    constructor() { }
}
export class ProductsLoaded implements Action{
    readonly type = ProductsActionTypes.ProductsLoaded;
    constructor(public payload: Product[]){ }
}
export class LoadProductsError implements Action{
    readonly type = ProductsActionTypes.LoadProductsError
    constructor(){}
}
export class AddProduct implements Action{
    readonly type = ProductsActionTypes.AddProduct;
    constructor(public payload: Product){ }
}
export class ProductAdded implements Action{
    readonly type = ProductsActionTypes.ProductAdded;
    constructor(public payload: Product){ }
}
export class AddProductError implements Action{
    readonly type = ProductsActionTypes.AddProductError
    constructor(){}
}
export class UpdateProduct implements Action{
    readonly type = ProductsActionTypes.UpdateProduct;
    constructor (public payload : Product){ }
}
export class ProductUpdated implements Action{
    readonly type = ProductsActionTypes.ProductUpdated;
    constructor (public payload : Product){ }
}
export class UpdateProductError implements Action{
    readonly type = ProductsActionTypes.UpdateProductError;
    constructor (){ }
}
export class DeleteProduct implements Action{
    readonly type = ProductsActionTypes.DeleteProduct;
    constructor (public payload : Product){ }
}
export class ProductDeleted implements Action{
    readonly type = ProductsActionTypes.ProductDeleted;
    constructor (public payload : Product){ }
}
export class DeleteProductError implements Action{
    readonly type = ProductsActionTypes.DeleteProductError;
    constructor (){ }
}
export type ProductsActions = 
    | LoadProductsWithPaginationAndSort
    | ProductsWithPaginationAndSortLoaded
    | LoadProductsWithPaginationAndSortError
    | LoadProducts
    | ProductsLoaded
    | LoadProductsError
    | AddProduct
    | ProductAdded
    | AddProductError
    | UpdateProduct
    | ProductUpdated
    | UpdateProductError
    | DeleteProduct
    | ProductDeleted
    | DeleteProductError
