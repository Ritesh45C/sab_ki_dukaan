import {ADD_PRODUCT, ADD_SUB_UNIT, EMPTY_CART} from '../actions/cartActions';
import {
  FETCH_CART_DATA_LOADING,
  FETCH_CART_DATA_SUCCESS,
  FETCH_CART_DATA_FAILURE,
} from '../actions/cartActions';
import {ProductType} from 'types/Products';

type Product = {
  product_id: string;
  units: number;
};

interface StateTypes {
  cartProducts: Array<ProductType>;
  cartData: Array<ProductType>;
}
const INITIAL_STATE: StateTypes = {
  cartProducts: [],
  cartData: [],
};

const reducer = (
  state = INITIAL_STATE,
  {type, product, payload, cartData, errorMessage}: any,
) => {
  switch (type) {
    case FETCH_CART_DATA_LOADING:
      return {
        ...state,
        cartDataIsLoading: true,
        cartDataErrorMessage: '',
      };

    case FETCH_CART_DATA_SUCCESS:
      return {
        ...state,
        cartData: Object.keys(cartData).map(k => cartData[k]),
        cartDataIsLoading: false,
        cartDataErrorMessage: null,
      };

    case FETCH_CART_DATA_FAILURE:
      return {
        ...state,
        cartData: {},
        cartDataIsLoading: false,
        cartDataErrorMessage: errorMessage,
      };
    case EMPTY_CART:
      return {
        ...state,
        cartProducts:[]
      }
    case ADD_PRODUCT:
      return {
        ...state,
        cartProducts: [...state.cartProducts, {...product, units: 1}],
      };
    case ADD_SUB_UNIT:
      let objIndex = state.cartProducts.findIndex(
        obj => obj.product_id == payload.product_id,
      );
      let obj;
      if(state.cartProducts[objIndex].units == 1 &&  payload.option == 'SUB'){
        obj = state.cartProducts.slice(0, objIndex).concat(state.cartProducts.slice(objIndex + 1, state.cartProducts.length))
      }else{
        obj = state.cartProducts.map((item, index) => {
       
          if (index === objIndex) {
              
              return {
                ...state.cartProducts[index],
                units:
                  payload.option == 'ADD'
                    ? //@ts-ignore
                      (state.cartProducts[index].units += 1)
                    : //@ts-ignore
                      (state.cartProducts[index].units -= 1),
              };
          }else{
            return item;
          }
  
        });
      }
      return {
        ...state,
        cartProducts: obj,
      };

    default:
      return state;
  }
};

export default reducer;
