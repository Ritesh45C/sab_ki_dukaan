import {call, put, takeLatest} from 'redux-saga/effects';
import FirebaseService from 'services/FirebaseService';
import {
  fetchCategoriesDataFailure,
  fetchCategoriesDataLoading,
  fetchCategoriesDataSuccess,
  FETCH_CATEGORIES_DATA_REQUEST,
} from '../actions/categoriesActions';
/**
 *
 * @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
 *
 * Use put para disparacar uma acao que sera lida pelo listener do Redux, ou seja, para atualizar um estado no reducer
 * Use call para disparar açoes assincronas, como chamadas as API's
 *
 * Call eh "blocante" - a chamada eh resolvida e soh apos terminar o codigo continua
 * Put eh "nao blocante" - a chamada eh executada asyncrona
 */
function* fetchCategoriesData() {
  // seta reducer para estado de loading
  yield put(fetchCategoriesDataLoading());

  // Fetch API
  const categoriesData = yield call(FirebaseService.fetchCategoriesData);

  if (categoriesData) {
    yield put(fetchCategoriesDataSuccess(categoriesData));
  } else {
    yield put(fetchCategoriesDataFailure('error'));
  }
}

export function* watchFetchCategoriesData() {
  yield takeLatest(FETCH_CATEGORIES_DATA_REQUEST, fetchCategoriesData);
}
