import { combineReducers } from 'redux';
import LoadingReducer from './loadingReducer';
import CategoriesReducer from './categoriesReducer'
import AuthReducer from './authReducer'
import SignupReducer from './signupReducer'
import ProductsReducer from './productsReducer'
import CartReducer from './cartReducer'
import PersonalInfoReducer from './PersonalInfoReducer'
import OrderReducer from './orderReducer'
import SearchProductsReducer from './searchProductsReducer'
import CarouselOfferts from './carouselOffertsReducer'
import StartupReducer from './startupReducer'

/**
 * Registrar TODOS os reducers neste arquivo
 *
 * @see https://redux.js.org/api-reference/combinereducers
 */
export default combineReducers({
  api: LoadingReducer,
  categories: CategoriesReducer,
  products: ProductsReducer,
  auth: AuthReducer,
  signup: SignupReducer,
  cart: CartReducer,
  personal_info: PersonalInfoReducer,
  orders: OrderReducer,
  productsRefs: SearchProductsReducer,
  carouselOfferts: CarouselOfferts ,
  startup: StartupReducer,
});
