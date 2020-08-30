import {call, put, takeLatest} from 'redux-saga/effects';
import FirebaseService from 'services/FirebaseService';
import {
  fetchProductsRefsDataFailure,
  fetchProductsRefsDataLoading,
  fetchProductsRefsDataSuccess,
  
  PRODUCTS_REFS_DATA_REQUEST,
} from '../actions/searchProductsActions';

function* fetchProductsRefsData() {
  // seta reducer para estado de loading
  yield put(fetchProductsRefsDataLoading());

  // Fetch API
  const productsRef = yield call(FirebaseService.fetchProductsRefsData);

  if (productsRef) {
    yield put(fetchProductsRefsDataSuccess(productsRef));
  } else {
    yield put(fetchProductsRefsDataFailure('error'));
  }
}

export function* watchFetchProductsRefsData() {
  yield takeLatest(PRODUCTS_REFS_DATA_REQUEST, fetchProductsRefsData);
}
