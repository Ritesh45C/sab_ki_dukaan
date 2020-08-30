import {call, put, takeLatest} from 'redux-saga/effects';
import FirebaseService from 'services/FirebaseService';
import {
  fetchProductsDataFailure,
  fetchProductsDataLoading,
  fetchProductsDataSuccess,
  FETCH_PRODUCTS_DATA_REQUEST,
} from '../actions/productsActions';
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

interface fetchProps {
  type:string,
  sub_category_selected:string
}
function* fetchProductsData(props:fetchProps) {
  // seta reducer para estado de loading
  yield put(fetchProductsDataLoading());

  // Fetch API
  const {sub_category_selected} = props;
  const productsData = yield call(FirebaseService.fetchProductsData,sub_category_selected);

  if (productsData) {
    yield put(fetchProductsDataSuccess(productsData));
  } else {
    yield put(fetchProductsDataFailure(''));
  }
}

export function* watchFetchProductsData() {
  yield takeLatest(FETCH_PRODUCTS_DATA_REQUEST, fetchProductsData);
}
