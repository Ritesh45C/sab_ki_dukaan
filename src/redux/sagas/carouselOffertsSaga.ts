import {call, put, takeLatest} from 'redux-saga/effects';
import FirebaseService from 'services/FirebaseService';
import {
  carouselOffertsFailure,
  carouselOffertsLoading,
  carouselOffertsSuccess,
  CAROUSEL_OFFERTS,
} from '../actions/carouselOffertsActions';

function* carouselOffertsSaga() {
  // seta reducer para estado de loading
  yield put(carouselOffertsLoading());

  // Fetch API
  const carouselOffertsData = yield call(FirebaseService.getCarouselOfferts);

  if (carouselOffertsData) {
    yield put(carouselOffertsSuccess(carouselOffertsData));
  } else {
    yield put(carouselOffertsFailure({
        code:'ERR_GENERAL',
        error:true,
        error_message:{
            title:'Error',
            message:'Failure loading carousel offerts'
        }
    }));
  }
}

export function* watchFetchCarouselOfferts() {
  yield takeLatest(CAROUSEL_OFFERTS, carouselOffertsSaga);
}
