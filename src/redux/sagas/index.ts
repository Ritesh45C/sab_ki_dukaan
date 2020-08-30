import { all, fork } from 'redux-saga/effects';
import { watchStartup } from './startupSaga';
import { watchFetchCategoriesData } from './categoriesSaga';
import  {watchFetchProductsData} from './productsSaga'
import { watchfetchCartData } from './cartProductsSaga';
import { watchFetchOrdersData } from './orderSaga';
import { watchFetchProductsRefsData } from './searchProductsSaga';
import { watchFetchCarouselOfferts } from './carouselOffertsSaga';

/**
 * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
 */
export default function* root() {
  yield all([
    fork(watchStartup), // Run when App starts
    fork(watchFetchCategoriesData),
    fork(watchFetchProductsData),
    fork(watchfetchCartData),
    fork(watchFetchOrdersData),
    fork(watchFetchProductsRefsData),
    fork(watchFetchCarouselOfferts)
  ]);
}
