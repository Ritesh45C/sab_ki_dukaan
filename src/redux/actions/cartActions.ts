import { ProductType } from "types/Products";

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const ADD_SUB_UNIT = 'ADD_SUB_UNIT'
export const FETCH_CART_DATA_REQUEST = 'FETCH_CART_DATA_REQUEST';
export const FETCH_CART_DATA_LOADING = 'FETCH_CART_DATA_LOADING';
export const FETCH_CART_DATA_SUCCESS = 'FETCH_CART_DATA_SUCCESS';
export const FETCH_CART_DATA_FAILURE = 'FETCH_CART_DATA_FAILURE';
export const EMPTY_CART = 'EMPTY_CART'
interface fetchProps {
  cartProducts: Array<ProductType>
}

export const emptyCart = () => ({
  type: EMPTY_CART
})
export const addProduct = (product: ProductType) => ({
  type: ADD_PRODUCT,
  product
})

export const addSubUnit = (product_id : string, option : "ADD" | "SUB") => ({
  type: ADD_SUB_UNIT,
  payload: {product_id, option}
})
export const fetchCartData = (cartProducts: fetchProps) => ({
  type: FETCH_CART_DATA_REQUEST,
  cartProducts
});

export const fetchCartDataLoading = () => ({
  type: FETCH_CART_DATA_LOADING,
});

export const fetchCartDataSuccess = (payload: any) => ({
  type: FETCH_CART_DATA_SUCCESS,
  cartData: payload,
});

export const fetchCartDataFailure = (payload: any) => ({
  type: FETCH_CART_DATA_FAILURE,
  errorMessage: payload,
});
