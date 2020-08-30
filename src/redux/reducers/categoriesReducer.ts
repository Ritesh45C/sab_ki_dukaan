
  import {
    FETCH_CATEGORIES_DATA_LOADING,
    FETCH_CATEGORIES_DATA_SUCCESS,
    FETCH_CATEGORIES_DATA_FAILURE,
    LOAD_SUB_CATEGORY,
    SELECT_SUB_CATEGORY
  } from '../actions/categoriesActions';
  
  import {CategoriesType, categorySelected} from 'types/Categories'


  
  interface StateTypes  {
      categoriesData: CategoriesType | null
      categoriesDataErrorMessage: string | null
      categoriesDataIsLoading: boolean,
      subCategories: categorySelected
  }

  const INITIAL_STATE: StateTypes = {
    categoriesData: null,
    categoriesDataErrorMessage: null,
    categoriesDataIsLoading: false,
    subCategories: {
      category_name:'',
      sub_category_name:'',
      sub_category_selected: '',
      sub_categories: []
    }
  };
  
  const reducer = (state = INITIAL_STATE, { type, categoriesData, errorMessage, subCategories, sub_category_selected}:any)  => {
    switch (type) {
      case FETCH_CATEGORIES_DATA_LOADING:
        return {
          ...state,
          categoriesDataIsLoading: true,
          categoriesDataErrorMessage: '',
        };
  
      case FETCH_CATEGORIES_DATA_SUCCESS:
        return {
          ...state,
          categoriesData: Object.keys(categoriesData).map(k => categoriesData[k]),
          categoriesDataIsLoading: false,
          categoriesDataErrorMessage: null,
        };
  
      case FETCH_CATEGORIES_DATA_FAILURE:
        return {
          ...state,
          categoriesData: {},
          categoriesDataIsLoading: false,
          categoriesDataErrorMessage: errorMessage,
        };
      case LOAD_SUB_CATEGORY:
        return {
          ...state,
          subCategories: subCategories
        }
        case SELECT_SUB_CATEGORY:
          return {
            ...state,
            subCategories: {
              ...state.subCategories,
              sub_category_selected: sub_category_selected
            }
          }
      default:
        return state;
    }
  };
  
  export default reducer;