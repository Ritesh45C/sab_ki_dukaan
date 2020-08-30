import {call, put, takeLatest} from 'redux-saga/effects';
import FirebaseService from 'services/FirebaseService';
import {
  fetchCartDataFailure,
  fetchCartDataLoading,
  fetchCartDataSuccess,
  FETCH_CART_DATA_REQUEST,
} from '../actions/cartActions';
import { ProductType } from 'types/Products';

interface fetchProps {
  cartProducts: Array<ProductType>
}
function* fetchCartData(props:fetchProps) {
  // seta reducer para estado de loading
  yield put(fetchCartDataLoading());

  // Fetch API
  const cartData = yield call(FirebaseService.fetchProductsByIds,props.cartProducts);

  if (cartData) {
    yield put(fetchCartDataSuccess(cartData));
  } else {
    yield put(fetchCartDataFailure('error'));
  }
}

export function* watchfetchCartData() {
  yield takeLatest(FETCH_CART_DATA_REQUEST, fetchCartData);
}
