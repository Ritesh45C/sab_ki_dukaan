import {categorySelected} from 'types/Categories';
export const FETCH_CATEGORIES_DATA_REQUEST = 'FETCH_CATEGORIES_DATA_REQUEST';
export const FETCH_CATEGORIES_DATA_LOADING = 'FETCH_CATEGORIES_DATA_LOADING';
export const FETCH_CATEGORIES_DATA_SUCCESS = 'FETCH_CATEGORIES_DATA_SUCCESS';
export const FETCH_CATEGORIES_DATA_FAILURE = 'FETCH_CATEGORIES_DATA_FAILURE';
export const LOAD_SUB_CATEGORY = 'LOAD_SUB_CATEGORY';
export const SELECT_SUB_CATEGORY = 'SELECT_SUB_CATEGORY';
export const load_subCategory = (payload: categorySelected) => ({
  type: LOAD_SUB_CATEGORY,
  subCategories: payload,
});
export const select_subCategory = (key: string) => ({
  type: SELECT_SUB_CATEGORY,
  sub_category_selected: key,
});
export const fetchCategoriesData = () => ({
  type: FETCH_CATEGORIES_DATA_REQUEST,
});

export const fetchCategoriesDataLoading = () => ({
  type: FETCH_CATEGORIES_DATA_LOADING,
});

export const fetchCategoriesDataSuccess = (payload: any) => ({
  type: FETCH_CATEGORIES_DATA_SUCCESS,
  categoriesData: payload,
});

export const fetchCategoriesDataFailure = (payload: any) => ({
  type: FETCH_CATEGORIES_DATA_FAILURE,
  errorMessage: payload,
});
