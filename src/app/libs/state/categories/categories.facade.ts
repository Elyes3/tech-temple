import { Injectable } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as CategoriesActions from './categories.actions';
import { PaginationInfo } from '../../dashboard/shared/PaginationInfo';
import { CategoriesState, getLoading } from './categories.reducer';
import { CategoriesActionTypes } from './categories.actions';
import { Category } from '../../shared/models/Category';
import { selectAllCategories } from '..';
@Injectable({
  providedIn: 'root'
})
export class CategoriesFacade {
  allCategories$ = this.store.pipe(select(selectAllCategories));
  isLoading$ = this.store.pipe(select(getLoading))
  mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === CategoriesActionTypes.AddCategory
        || action.type === CategoriesActionTypes.UpdateCategory
        || action.type === CategoriesActionTypes.DeleteCategory

      )
    );

  constructor(private store: Store<CategoriesState>, private actions$: ActionsSubject) {}

  loadCategories() {
    console.log("ERROR HERE")
    this.store.dispatch(new CategoriesActions.LoadCategories());
  }
  loadCategoriesWithPaginationAndSort(paginationInfo: PaginationInfo) {
    console.log("HELLO WORLD")
    this.store.dispatch(new CategoriesActions.LoadCategoriesWithPaginationAndSort(paginationInfo))
  }
  addCategory(category: Category) {
    this.store.dispatch(new CategoriesActions.AddCategory(category));
  }

  updateCategory(category : Category) {
    this.store.dispatch(new CategoriesActions.UpdateCategory(category));
  }

  deleteCategory(category : Category) {
    this.store.dispatch(new CategoriesActions.DeleteCategory(category));
  }
  
}