
  import {
    ORDER_DATA_LOADING,
    ORDER_DATA_SUCCESS,
    ORDER_DATA_FAILURE,
  } from '../actions/orderActions';
  
 
  interface StateTypes  {
    orderData: [],
    orderDataErrorMessage: string | null
    orderDataIsLoading: boolean,
  }
  const INITIAL_STATE: StateTypes = {

    orderData: [],
    orderDataErrorMessage: null,
    orderDataIsLoading: false,

  };
  
  const reducer = (state = INITIAL_STATE, { type, OrderData, errorMessage, input } :any)  => {
    switch (type) {
      case ORDER_DATA_LOADING:
        return {
          ...state,
          orderDataIsLoading: true,
          orderDataErrorMessage: '',
        };
  
      case ORDER_DATA_SUCCESS:
        return {
          ...state,
          orderData: OrderData,
          orderDataIsLoading: false,
          orderDataErrorMessage: null,
        };
  
      case ORDER_DATA_FAILURE:
        return {
          ...state,
          orderData: [],
          orderDataIsLoading: false,
          orderDataErrorMessage: errorMessage,
        };
      default:
        return state;
    }
  };
  
  export default reducer;