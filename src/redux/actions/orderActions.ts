export const ORDER_DATA_REQUEST = 'ORDER_DATA_REQUEST';
export const ORDER_DATA_LOADING = 'ORDER_DATA_LOADING';
export const ORDER_DATA_SUCCESS = 'ORDER_DATA_SUCCESS';
export const ORDER_DATA_FAILURE = 'ORDER_DATA_FAILURE';


export const fetchOrderData = () => ({
  type: ORDER_DATA_REQUEST,
});

export const fetchOrderDataLoading = () => ({
  type: ORDER_DATA_LOADING,
});

export const fetchOrderDataSuccess = (payload: any) => ({
  type: ORDER_DATA_SUCCESS,
  OrderData: payload,
});

export const fetchOrderDataFailure = (payload: any) => ({
  type: ORDER_DATA_FAILURE,
  errorMessage: payload,
});


