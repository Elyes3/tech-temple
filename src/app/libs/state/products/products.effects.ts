import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { ProductsService } from "../../dashboard/services/products.service";
import { AddProduct, ProductsActionTypes, ProductsLoaded, ProductsWithPaginationAndSortLoaded, ProductAdded, ProductDeleted, ProductUpdated, DeleteProduct, LoadProducts, LoadProductsWithPaginationAndSort, UpdateProduct } from "./products.actions";
import { Product } from "../../shared/models/Product";
@Injectable()
export class ProductsEffects {
    constructor(
        private actions$: Actions,
        private productsService: ProductsService,
    ) { }
    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActionTypes.LoadProducts),
            switchMap((action: LoadProducts) =>
                this.productsService.loadProducts().pipe(
                    map((res: Product[]) => new ProductsLoaded(res)),
                )
            )
        )
    );
        loadProductsWithPaginationAndSort$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActionTypes.LoadProductsWithPaginationAndSort),
            switchMap((action: LoadProductsWithPaginationAndSort) => {
                console.log("err2")
                return this.productsService.loadProductsWithPaginationAndSort(action.payload).pipe(
                    map((res: Product[]) => { console.log('err3'); return new ProductsWithPaginationAndSortLoaded(res) }),
                )
            }
            )
        )
    );
    addProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActionTypes.AddProduct),
            switchMap((action: AddProduct) =>
                this.productsService.addProduct(action.payload).pipe(
                    map((res: Product) => new ProductAdded(res)),
)
            )
        )
    );
    updateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActionTypes.UpdateProduct),
            switchMap((action: UpdateProduct) =>
                this.productsService.updateProduct(action.payload.id,action.payload).pipe(
                    map((res: Product) => new ProductUpdated(res)),
)
            )
        )
    );
    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActionTypes.DeleteProduct),
            switchMap((action: DeleteProduct) =>
                this.productsService.deleteProduct(action.payload.id).pipe(
                    map((res: Product) => new ProductDeleted(res))),
            )
        )
    );
}