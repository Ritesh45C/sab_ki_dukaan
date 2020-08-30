import {
  PRODUCTS_REFS_DATA_LOADING,
  PRODUCTS_REFS_DATA_SUCCESS,
  PRODUCTS_REFS_DATA_FAILURE,
} from '../actions/searchProductsActions';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

type PRefs = {
  product_ref: FirebaseFirestoreTypes.DocumentReference;
  product_name: string;
}
interface StateTypes {
  productsRefs: PRefs[],
  productsRefsErrorMessage: string | null;
  productsRefsIsLoading: boolean;
}

const INITIAL_STATE: StateTypes = {
  productsRefs: [],
  productsRefsErrorMessage: null,
  productsRefsIsLoading: false,
};

const reducer = (
  state = INITIAL_STATE,
  {type, productsRefs, errorMessage}: any,
) => {
  switch (type) {
    case PRODUCTS_REFS_DATA_LOADING:
      return {
        ...state,
        productsRefsIsLoading: true,
        productsRefsErrorMessage: '',
      };

    case PRODUCTS_REFS_DATA_SUCCESS:
      return {
        ...state,
        productsRefs:productsRefs,
        productsRefsIsLoading: false,
        productsRefsErrorMessage: null,
      };

    case PRODUCTS_REFS_DATA_FAILURE:
      return {
        ...state,
        productsRefs: {},
        productsRefsIsLoading: false,
        productsRefsErrorMessage: errorMessage,
      };
    default:
      return state;
  }
};

export default reducer;
