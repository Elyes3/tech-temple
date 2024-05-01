import { Injectable } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as ProductsActions from './products.actions';
import { PaginationInfo } from '../../dashboard/shared/PaginationInfo';
import { ProductsState, getLoading } from './products.reducer';
import { ProductsActionTypes } from './products.actions';
import { Product } from '../../shared/models/Product';
import { selectAllProducts } from '..';
@Injectable({
  providedIn: 'root'
})
export class ProductsFacade {
  allProducts$ = this.store.pipe(select(selectAllProducts));
  isLoading$ = this.store.pipe(select(getLoading))
  mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === ProductsActionTypes.AddProduct
        || action.type === ProductsActionTypes.UpdateProduct
        || action.type === ProductsActionTypes.DeleteProduct

      )
    );

  constructor(private store: Store<ProductsState>, private actions$: ActionsSubject) {}

  loadProducts() {
    this.store.dispatch(new ProductsActions.LoadProducts());
  }
  loadProductsWithPaginationAndSort(paginationInfo: PaginationInfo) {
    console.log("err")
    this.store.dispatch(new ProductsActions.LoadProductsWithPaginationAndSort(paginationInfo))
  }
  addProduct(product: Product) {
    this.store.dispatch(new ProductsActions.AddProduct(product));
  }

  updateProduct(product : Product) {
    this.store.dispatch(new ProductsActions.UpdateProduct(product));
  }

  deleteProduct(product : Product) {
    this.store.dispatch(new ProductsActions.DeleteProduct(product));
  }
  
}