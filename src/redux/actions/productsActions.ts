export const FETCH_PRODUCTS_DATA_REQUEST = 'FETCH_PRODUCTS_DATA_REQUEST';
export const FETCH_PRODUCTS_DATA_LOADING = 'FETCH_PRODUCTS_DATA_LOADING';
export const FETCH_PRODUCTS_DATA_SUCCESS = 'FETCH_PRODUCTS_DATA_SUCCESS';
export const FETCH_PRODUCTS_DATA_FAILURE = 'FETCH_PRODUCTS_DATA_FAILURE';
export const ACTIVE_FILTER = 'ACTIVE_FILTER';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const ADD_FILTERS = 'ADD_FILTERS';
export const RESET_FILTER = 'RESET_FILTER';
export const fetchProductsData = (payload: string) => ({
  type: FETCH_PRODUCTS_DATA_REQUEST,
  sub_category_selected: payload,
});

export const fetchProductsDataLoading = () => ({
  type: FETCH_PRODUCTS_DATA_LOADING,
});

export const fetchProductsDataSuccess = (payload: any) => ({
  type: FETCH_PRODUCTS_DATA_SUCCESS,
  productsData: payload,
});

export const fetchProductsDataFailure = (payload: any) => ({
  type: FETCH_PRODUCTS_DATA_FAILURE,
  errorMessage: payload,
});

export const addFilters = (filters: string[]) => ({
  type: ADD_FILTERS,
  filters: filters,
});

export const activeFilter = (filterBy: string, filterActiveIndex: number) => ({
  type: ACTIVE_FILTER,
  filterBy: filterBy,
  filterActiveIndex: filterActiveIndex
});

export const toggleFilter = () => ({
  type: TOGGLE_FILTER
})

export const resetFilter = () => ({
  type: RESET_FILTER
})