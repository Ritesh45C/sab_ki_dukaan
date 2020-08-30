import {call, put, takeLatest} from 'redux-saga/effects';
import FirebaseService from 'services/FirebaseService';
import {
  fetchOrderDataFailure,
  fetchOrderDataLoading,
  fetchOrderDataSuccess,
  ORDER_DATA_REQUEST,
} from '../actions/orderActions';

function* fetchOrderData () {
  // seta reducer para estado de loading
  yield put(fetchOrderDataLoading());

  // Fetch API

  const OrderData = yield call(FirebaseService.fetchOrderData);
 console.log(OrderData)
  if (OrderData) {
    yield put(fetchOrderDataSuccess(OrderData));
  } else {
    yield put(fetchOrderDataFailure('error'));
  }
}

export function* watchFetchOrdersData() {
  yield takeLatest(ORDER_DATA_REQUEST, fetchOrderData);
}
