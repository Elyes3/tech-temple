import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CategoriesActionTypes, CategoriesActions } from './categories.actions';
import { Category } from '../../shared/models/Category';
export interface CategoriesState extends EntityState<Category>{
    loading: boolean
}
export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>();
export const initialState: CategoriesState = adapter.getInitialState({
    loading: false,
})
export function categoriesReducer(state : CategoriesState = initialState, action: CategoriesActions): CategoriesState {
    switch (action.type) {
        case CategoriesActionTypes.LoadCategories: {
            return {
                ...state, loading: true,
            }
        }
        case CategoriesActionTypes.CategoriesLoaded: {
            return {
                ...adapter.setAll(action.payload, state), loading: false
            }
        }
        case CategoriesActionTypes.AddCategory: {
            return {
                ...state, loading: true
            }
        }
        case CategoriesActionTypes.CategoryAdded: {
            return {
                ...adapter.addOne(action.payload, state), loading: false
            }
        }
        case CategoriesActionTypes.UpdateCategory: {
            return {
                ...state, loading: true,
            }
        }
        case CategoriesActionTypes.CategoryUpdated: {
            return {
                ...adapter.upsertOne(action.payload, state), loading: false
            }
        }
        case CategoriesActionTypes.DeleteCategory: {
            return {
                ...state, loading: true,
            }
        }
        case CategoriesActionTypes.CategoryDeleted: {
            return {
                ...adapter.removeOne(action.payload.id, state), loading: false
            }
        }
        case CategoriesActionTypes.LoadCategoriesWithPaginationAndSort: {
            return {
                ...state, loading: true,
            }
        } 
        case CategoriesActionTypes.CategoriesWithPaginationAndSortLoaded: {
            return {
                ...adapter.setAll(action.payload, state),
                loading: false,
            }
        }
        case CategoriesActionTypes.LoadCategoriesWithPaginationAndSortError: {
            return {
                ...state, loading: false,
            }
        }
        case CategoriesActionTypes.LoadCategoriesError: {
            return {
                ...state, loading: false,
            }
        }
        case CategoriesActionTypes.AddCategoryError: {
            return {
                ...state, loading: false,
            }
        }
        case CategoriesActionTypes.DeleteCategoryError: {
            return {
                ...state, loading: false,
            }
        }
        case CategoriesActionTypes.UpdateCategoryError: {
            return {
                ...state, loading: false,
            }
        }
        default:
            return state
    }
}
export const getLoading = (state: CategoriesState) => state.loading;

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectCategoryIds = selectIds;

export const selectCategoryEntities = selectEntities;

export const selectAllCategories = selectAll;

export const selectCategoriesTotal = selectTotal;
