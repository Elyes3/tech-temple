import { Action } from "@ngrx/store";
import { PaginationInfo } from "../../dashboard/shared/PaginationInfo";
import { Category } from "../../shared/models/Category";

export enum CategoriesActionTypes {
    LoadCategoriesWithPaginationAndSort = '[Categories] Load Categories with Pagination and Sort',
    CategoriesWithPaginationAndSortLoaded = '[Categories] Categories with Pagination and Sort Loaded',
    LoadCategoriesWithPaginationAndSortError = '[Categories] Load Categories with Pagination and Sort Error',
    LoadCategories = '[Categories] Load Categories',
    CategoriesLoaded = '[Categories] Categories Loaded',
    LoadCategoriesError = '[Categories] Load Categories Error',
    AddCategory = '[Categories] Add Category',
    CategoryAdded = '[Categories] Category Added',
    AddCategoryError = '[Categories] Add Category Error',
    DeleteCategory = '[Categories] Delete Category',
    CategoryDeleted = '[Categories] Category Deleted',
    DeleteCategoryError = '[Categories] Delete Category Error',
    UpdateCategory = '[Categories] Update Category',
    CategoryUpdated = '[Categories] Category Updated',
    UpdateCategoryError = '[Categories] Update Category Error',
}
export class LoadCategoriesWithPaginationAndSort implements Action{
    readonly type = CategoriesActionTypes.LoadCategoriesWithPaginationAndSort
    constructor(public payload : PaginationInfo){}
}
export class CategoriesWithPaginationAndSortLoaded implements Action{
    readonly type = CategoriesActionTypes.CategoriesWithPaginationAndSortLoaded
    constructor(public payload : Category[]){}
}
export class LoadCategoriesWithPaginationAndSortError implements Action{
    readonly type = CategoriesActionTypes.LoadCategoriesWithPaginationAndSortError
    constructor(){}
}
export class LoadCategories implements Action{
    readonly type = CategoriesActionTypes.LoadCategories;
    constructor() {}
}
export class CategoriesLoaded implements Action{
    readonly type = CategoriesActionTypes.CategoriesLoaded;
    constructor(public payload: Category[]){ }
}
export class LoadCategoriesError implements Action{
    readonly type = CategoriesActionTypes.LoadCategoriesError
    constructor(){}
}
export class AddCategory implements Action{
    readonly type = CategoriesActionTypes.AddCategory;
    constructor(public payload: Category){ }
}
export class CategoryAdded implements Action{
    readonly type = CategoriesActionTypes.CategoryAdded;
    constructor(public payload: Category){ }
}
export class AddCategoryError implements Action{
    readonly type = CategoriesActionTypes.AddCategoryError
    constructor(){}
}
export class UpdateCategory implements Action{
    readonly type = CategoriesActionTypes.UpdateCategory;
    constructor (public payload : Category){ }
}
export class CategoryUpdated implements Action{
    readonly type = CategoriesActionTypes.CategoryUpdated;
    constructor (public payload : Category){ }
}
export class UpdateCategoryError implements Action{
    readonly type = CategoriesActionTypes.UpdateCategoryError
    constructor(){}
}
export class DeleteCategory implements Action{
    readonly type = CategoriesActionTypes.DeleteCategory;
    constructor (public payload : Category){ }
}
export class CategoryDeleted implements Action{
    readonly type = CategoriesActionTypes.CategoryDeleted;
    constructor (public payload : Category){ }
}
export class DeleteCategoryError implements Action{
    readonly type = CategoriesActionTypes.DeleteCategoryError;
    constructor (){}
}

export type CategoriesActions = 
    | LoadCategoriesWithPaginationAndSort
    | CategoriesWithPaginationAndSortLoaded
    | LoadCategoriesWithPaginationAndSortError
    | LoadCategories
    | CategoriesLoaded
    | LoadCategoriesError
    | AddCategory
    | CategoryAdded
    | AddCategoryError
    | UpdateCategory
    | CategoryUpdated
    | UpdateCategoryError
    | DeleteCategory
    | CategoryDeleted
    | DeleteCategoryError
