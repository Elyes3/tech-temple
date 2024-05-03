import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users/users.reducer';
import * as fromCategories from './categories/categories.reducer'
import * as fromProducts from './products/products.reducer'
export interface AppState{
    users: fromUsers.UsersState,
    categories: fromCategories.CategoriesState,
    products: fromProducts.ProductsState
}
export const reducers: ActionReducerMap<AppState,any> = {
    users: fromUsers.usersReducer,
    categories: fromCategories.categoriesReducer,
    products: fromProducts.productsReducer
};
export const selectUsersState = createFeatureSelector<fromUsers.UsersState>('users');

export const selectDataLoading = createSelector(
    selectUsersState,
    fromUsers.getDataLoading
)
export const selectUserIds = createSelector(
    selectUsersState,
    fromUsers.selectUserIds
)
export const selectUserEntities = createSelector(
    selectUsersState,
    fromUsers.selectUserEntities
)
export const selectAllUsers = createSelector(
    selectUsersState,
    fromUsers.selectAllUsers
)
export const selectUsersTotal = createSelector(
    selectUsersState,
    fromUsers.selectUsersTotal
)
export const selectAuthenticatedUser = createSelector(
    selectUsersState,
    fromUsers.getAuthenticatedUser
)
// ================================================================== CATEGORIES ======================================================================================
// ================================================================== SELECTOR ========================================================================================
export const selectCategoriesState = createFeatureSelector<fromCategories.CategoriesState>('categories');

export const selectCategoryLoading = createSelector(
    selectCategoriesState,
    fromCategories.getLoading
)
export const selectCategoryIds = createSelector(
    selectCategoriesState,
    fromCategories.selectCategoryIds
)
export const selectCategoryEntities = createSelector(
    selectCategoriesState,
    fromCategories.selectCategoryEntities
)
export const selectAllCategories = createSelector(
    selectCategoriesState,
    fromCategories.selectAllCategories
)
export const selectCategoriesTotal = createSelector(
    selectCategoriesState,
    fromCategories.selectCategoriesTotal
)
// ================================================================== PRODUCTS ======================================================================================
// ================================================================== SELECTOR ========================================================================================export const selectCategoriesState = createFeatureSelector<fromCategories.CategoriesState>('categories');
export const selectProductsState = createFeatureSelector<fromProducts.ProductsState>('products');

export const selectProductLoading = createSelector(
    selectProductsState,
    fromProducts.getLoading
)
export const selectProductIds = createSelector(
    selectProductsState,
    fromProducts.selectProductIds
)
export const selectProductEntities = createSelector(
    selectProductsState,
    fromProducts.selectProductEntities
)
export const selectAllProducts = createSelector(
    selectProductsState,
    fromProducts.selectAllProducts
)
export const selectProductsTotal = createSelector(
    selectProductsState,
    fromProducts.selectProductsTotal
)
