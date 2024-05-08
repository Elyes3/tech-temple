import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { CategoriesService } from "../../dashboard/services/categories.service";
import { AddCategory, AddCategoryError, CategoriesActionTypes, CategoriesLoaded, CategoriesWithPaginationAndSortLoaded, CategoryAdded, CategoryDeleted, CategoryUpdated, DeleteCategory, DeleteCategoryError, LoadCategories, LoadCategoriesError, LoadCategoriesWithPaginationAndSort, LoadCategoriesWithPaginationAndSortError, UpdateCategory, UpdateCategoryError } from "./categories.actions";
import { Category } from "../../shared/models/Category";
@Injectable()
export class CategoriesEffects {
    constructor(
        private actions$: Actions,
        private categoriesService: CategoriesService,
    ) { }
    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoriesActionTypes.LoadCategories),
            switchMap((action: LoadCategories) =>
                this.categoriesService.loadCategories().pipe(
                    map((res: Category[]) => new CategoriesLoaded(res)),
                    catchError(error => of(new LoadCategoriesError()))
                )
            )
        )
    );
        loadCategoriesWithPaginationAndSort$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoriesActionTypes.LoadCategoriesWithPaginationAndSort),
            switchMap((action: LoadCategoriesWithPaginationAndSort) => {
                console.log(action.payload)
                return this.categoriesService.loadCategoriesWithPaginationAndSort(action.payload).pipe(
                    map((res: Category[]) => new CategoriesWithPaginationAndSortLoaded(res)),
                    catchError(error => of(new LoadCategoriesWithPaginationAndSortError()))
                )
            }
            )
        )
    );
    addCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoriesActionTypes.AddCategory),
            switchMap((action: AddCategory) =>
                this.categoriesService.addCategory(action.payload).pipe(
                    map((res: Category) => new CategoryAdded(res)),
                    catchError(error => of(new AddCategoryError()))
)
            )
        )
    );
    updateCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoriesActionTypes.UpdateCategory),
            switchMap((action: UpdateCategory) =>
                this.categoriesService.updateCategory(action.payload.id,action.payload).pipe(
                    map((res: Category) => new CategoryUpdated(res)),
                    catchError(error => of(new UpdateCategoryError()))
)
            )
        )
    );
    deleteCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoriesActionTypes.DeleteCategory),
            switchMap((action: DeleteCategory) =>
                this.categoriesService.deleteCategory(action.payload.id).pipe(
                    map((res: Category) => new CategoryDeleted(res)),
                    catchError(error => of(new DeleteCategoryError()))),
            )
        )
    );
}