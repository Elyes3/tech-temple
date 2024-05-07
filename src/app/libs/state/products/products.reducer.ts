import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ProductsActionTypes, ProductsActions } from './products.actions';
import { Product } from '../../shared/models/Product';
export interface ProductsState extends EntityState<Product>{
    loading: boolean
}
export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();
export const initialState: ProductsState = adapter.getInitialState({
    loading: false,
})
export function productsReducer(state : ProductsState = initialState, action: ProductsActions): ProductsState {
    switch (action.type) {
        case ProductsActionTypes.LoadProducts: {
            return {
                ...state, loading: true,
            }
        }
        case ProductsActionTypes.ProductsLoaded: {
            return {
                ...adapter.setAll(action.payload, state), loading: false
            }
        }
        case ProductsActionTypes.AddProduct: {
            return {
                ...state, loading: true
            }
        }
        case ProductsActionTypes.ProductAdded: {
            return {
                ...adapter.addOne(action.payload, state), loading: false
            }
        }
        case ProductsActionTypes.UpdateProduct: {
            return {
                ...state, loading: true,
            }
        }
        case ProductsActionTypes.ProductUpdated: {
            return {
                ...adapter.upsertOne(action.payload, state), loading: false
            }
        }
        case ProductsActionTypes.DeleteProduct: {
            return {
                ...state, loading: true,
            }
        }
        case ProductsActionTypes.ProductDeleted: {
            return {
                ...adapter.removeOne(action.payload.id, state), loading: false
            }
        }
        case ProductsActionTypes.LoadProductsWithPaginationAndSort: {
            return {
                ...state, loading: true,
            }
        }
        case ProductsActionTypes.ProductsWithPaginationAndSortLoaded: {
            console.log("ERR4")
            return {
                ...adapter.setAll(action.payload, state),
                loading: false,
            }
        }
        case ProductsActionTypes.AddProductError: {
            return {
                ...state, loading: false,
            }
            }
        case ProductsActionTypes.UpdateProductError: {
            return {
                ...state, loading: false,
            }
            }
        case ProductsActionTypes.DeleteProductError: {
            return {
                ...state, loading: false,
            }
            }
        case ProductsActionTypes.LoadProductsError: {
            return {
                ...state, loading: false,
            }
            }
        case ProductsActionTypes.LoadProductsWithPaginationAndSortError: {
            return {
                ...state, loading: false,
            }
            }
        default:
            return state
    }
}
export const getLoading = (state: ProductsState) => state.loading;
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectProductIds = selectIds;

export const selectProductEntities = selectEntities;

export const selectAllProducts = selectAll;

export const selectProductsTotal = selectTotal;
