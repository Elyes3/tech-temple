import { Action } from "@ngrx/store";
import { PaginationInfo } from "../../dashboard/shared/PaginationInfo";
import { Category } from "../../shared/models/Category";

export enum CategoriesActionTypes {
    LoadCategoriesWithPaginationAndSort = '[Categories] Load Categories with Pagination and Sort',
    CategoriesWithPaginationAndSortLoaded = '[Categories] Categories with Pagination and Sort Loaded',
    LoadCategories = '[Categories] Load Categories',
    CategoriesLoaded = '[Categories] Categories Loaded',
    AddCategory = '[Categories] Add Category',
    CategoryAdded = '[Categories] Category Added',
    DeleteCategory = '[Categories] Delete Category',
    CategoryDeleted = '[Categories] Category Deleted',
    UpdateCategory = '[Categories] Update Category',
    CategoryUpdated = '[Categories] Category Updated',
}
export class LoadCategoriesWithPaginationAndSort implements Action{
    readonly type = CategoriesActionTypes.LoadCategoriesWithPaginationAndSort
    constructor(public payload : PaginationInfo){}
}
export class CategoriesWithPaginationAndSortLoaded implements Action{
    readonly type = CategoriesActionTypes.CategoriesWithPaginationAndSortLoaded
    constructor(public payload : Category[]){}
}
export class LoadCategories implements Action{
    readonly type = CategoriesActionTypes.LoadCategories;
    constructor() { }
}
export class CategoriesLoaded implements Action{
    readonly type = CategoriesActionTypes.CategoriesLoaded;
    constructor(public payload: Category[]){ }
}
export class AddCategory implements Action{
    readonly type = CategoriesActionTypes.AddCategory;
    constructor(public payload: Category){ }
}
export class CategoryAdded implements Action{
    readonly type = CategoriesActionTypes.CategoryAdded;
    constructor(public payload: Category){ }
}
export class UpdateCategory implements Action{
    readonly type = CategoriesActionTypes.UpdateCategory;
    constructor (public payload : Category){ }
}
export class CategoryUpdated implements Action{
    readonly type = CategoriesActionTypes.CategoryUpdated;
    constructor (public payload : Category){ }
}
export class DeleteCategory implements Action{
    readonly type = CategoriesActionTypes.DeleteCategory;
    constructor (public payload : Category){ }
}
export class CategoryDeleted implements Action{
    readonly type = CategoriesActionTypes.CategoryDeleted;
    constructor (public payload : Category){ }
}
export type CategoriesActions = 
    | LoadCategoriesWithPaginationAndSort
    | CategoriesWithPaginationAndSortLoaded
    | LoadCategories
    | CategoriesLoaded
    | AddCategory
    | CategoryAdded
    | UpdateCategory
    | CategoryUpdated
    | DeleteCategory
    | CategoryDeleted
