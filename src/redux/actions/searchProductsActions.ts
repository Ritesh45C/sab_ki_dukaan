export const PRODUCTS_REFS_DATA_REQUEST = 'PRODUCTS_REFS_DATA_REQUEST';
export const PRODUCTS_REFS_DATA_LOADING = 'PRODUCTS_REFS_DATA_LOADING';
export const PRODUCTS_REFS_DATA_SUCCESS = 'PRODUCTS_REFS_DATA_SUCCESS';
export const PRODUCTS_REFS_DATA_FAILURE = 'PRODUCTS_REFS_DATA_FAILURE';

export const fetchProductsRefsData = () => ({
  type: PRODUCTS_REFS_DATA_REQUEST,
});

export const fetchProductsRefsDataLoading = () => ({
  type: PRODUCTS_REFS_DATA_LOADING,
});

export const fetchProductsRefsDataSuccess = (payload: any) => ({
  type: PRODUCTS_REFS_DATA_SUCCESS,
  productsRefs: payload,
});

export const fetchProductsRefsDataFailure = (payload: any) => ({
  type: PRODUCTS_REFS_DATA_FAILURE,
  errorMessage: payload,
});


