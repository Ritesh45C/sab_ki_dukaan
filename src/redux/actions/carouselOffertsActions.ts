import { ErrorHandler, CarouselOffertsType } from "types/General";
export const CAROUSEL_OFFERTS = 'CAROUSEL_OFFERTS_REQUEST';
export const CAROUSEL_OFFERTS_LOADING = 'CAROUSEL_OFFERTS_LOADING'
export const CAROUSEL_OFFERTS_FAILURE = 'CAROUSEL_OFFERTS_FAILURE'
export const CAROUSEL_OFFERTS_SUCCESS = 'CAROUSEL_OFFERTS_SUCCESS'
export const carouselOfferts = () => ({
  type: CAROUSEL_OFFERTS,
});
export const carouselOffertsLoading = () => ({
  type: CAROUSEL_OFFERTS_LOADING,
});

export const carouselOffertsFailure = (error : ErrorHandler) => ({
  type: CAROUSEL_OFFERTS_FAILURE,
  errorMessage: error,
});

export const carouselOffertsSuccess = (carouselOfferts: CarouselOffertsType[]) => ({
  type: CAROUSEL_OFFERTS_SUCCESS,
  carouselOfferts
})