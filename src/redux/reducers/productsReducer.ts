import {
  FETCH_PRODUCTS_DATA_LOADING,
  FETCH_PRODUCTS_DATA_SUCCESS,
  FETCH_PRODUCTS_DATA_FAILURE,
  ACTIVE_FILTER,
  TOGGLE_FILTER,
} from '../actions/productsActions';

import {ProductType, Product} from 'types/Products';

export type Filter = {
  filter: string;
  filterActiveIndex: number;
  filterActive: boolean;
  filterOptions: string[]
};
interface StateTypes {
  productsData: Array<ProductType>;
  productsDataErrorMessage: string | null;
  productsDataIsLoading: boolean;
  filter: Filter;
}
const INITIAL_STATE: StateTypes = {
  productsData: [],
  productsDataErrorMessage: null,
  productsDataIsLoading: false,
  filter: {
    filter: '',
    filterActiveIndex: 0,
    filterActive: false,
    filterOptions:[]
  },
};

const getFilterOptions = (productsData: ProductType[]) => {
  const reducer = (prevValue: string[], currentValue: ProductType) => {
    currentValue.filterby.map(value => {
      if (!prevValue.find(val => val == value)) {
        prevValue.push(value);
      }
    });
    return prevValue;
  };
  let filters = productsData.reduce(reducer, []);
  return filters;
};

const reducer = (
  state = INITIAL_STATE,
  {type, productsData, errorMessage, filterBy, filterActiveIndex}: any,
) => {
  switch (type) {
    case FETCH_PRODUCTS_DATA_LOADING:
      return {
        ...state,
        productsDataIsLoading: true,
        productsDataErrorMessage: '',
      };

    case FETCH_PRODUCTS_DATA_SUCCESS:
      const filters = getFilterOptions(productsData);
      return {
        ...state,
        productsData: productsData,
        productsDataIsLoading: false,
        productsDataErrorMessage: null,
        filter:{
          filter: filters[0],
          filterActiveIndex: 0,
          filterActive: false,
          filterOptions: filters
        }
      };

    case FETCH_PRODUCTS_DATA_FAILURE:
      return {
        ...state,
        productsData: null,
        productsDataIsLoading: false,
        productsDataErrorMessage: errorMessage,
      };
    case ACTIVE_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          filter: filterBy,
          filterActiveIndex: filterActiveIndex,
          filterActive: true,
        },
      };
    case TOGGLE_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          filterActive: !state.filter.filterActive,
        },
      };
    default:
      return state;
  }
};

export default reducer;
