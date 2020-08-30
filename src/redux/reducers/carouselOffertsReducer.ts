import {
  CAROUSEL_OFFERTS_LOADING,
  CAROUSEL_OFFERTS_FAILURE,
  CAROUSEL_OFFERTS_SUCCESS,
} from '../actions/carouselOffertsActions';
import {ErrorHandler, CarouselOffertsType} from 'types/General';

interface carouselOffertsTypes {
  carouselOfferts: CarouselOffertsType[];
  carouselOffertsErrorMessage: ErrorHandler | null;
  carouselOffertsIsLoading: boolean;
}
const INITIAL_STATE: carouselOffertsTypes = {
  carouselOfferts: [],
  carouselOffertsErrorMessage: null,
  carouselOffertsIsLoading: false,
};

const reducer = (
  state = INITIAL_STATE,
  {type, errorMessage, carouselOfferts}: any,
) => {
  switch (type) {
    case CAROUSEL_OFFERTS_LOADING:
      return {
        ...state,
        carouselOffertsIsLoading: true,
        carouselOffertsErrorMessage: null,
      };
    case CAROUSEL_OFFERTS_SUCCESS:
      return {
        ...state,
        carouselOfferts: carouselOfferts,
        carouselOffertsIsLoading: false,
        carouselOffertsErrorMessage: null,
      };
    case CAROUSEL_OFFERTS_FAILURE:
      return {
        ...state,
        carouselOffertsIsLoading: false,
        carouselOffertsErrorMessage: errorMessage,
      };
    default:
      return state;
  }
};

export default reducer;
