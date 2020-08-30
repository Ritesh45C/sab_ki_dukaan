import {call, put, takeLatest} from 'redux-saga/effects';
import FirebaseService from 'services/FirebaseService';
import {
  fetchUserDataFailure,
  fetchUserDataLoading,
  fetchUserDataSuccess,
  USER_DATA_REQUEST,
} from '../actions/authActions';

function* fetchUserData() {
  // seta reducer para estado de loading
  yield put(fetchUserDataLoading());

  // Fetch API
  const userData = yield call(FirebaseService.fetchUserData);

  if (userData) {
    yield put(fetchUserDataSuccess(userData));
  } else {
    yield put(fetchUserDataFailure('error'));
  }
}

export function* watchFetchCategoriesData() {
  yield takeLatest(USER_DATA_REQUEST, fetchUserData);
}
