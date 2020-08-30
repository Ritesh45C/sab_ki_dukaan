import {put, call, takeLatest} from 'redux-saga/effects';
import {
  STARTUP,
  startupLoading,
  startupFailure,
  startupSuccess,
} from '../actions/startupActions';
import NavigationService from 'services/NavigationService';
import FirebaseService from 'services/FirebaseService';
import messaging from '@react-native-firebase/messaging';
import notifee, {Notification, Importance} from '@notifee/react-native';
import { carouselOffertsSuccess } from 'redux/actions/carouselOffertsActions';
import { fetchCategoriesDataSuccess } from 'redux/actions/categoriesActions';
import { fetchProductsRefsDataSuccess } from 'redux/actions/searchProductsActions';

const onMessageReceived = async (message: any) => {
  let notification: Notification = JSON.parse(message.data.notifee);
  // @ts-ignore
  let channelIdServerData = notification.android.channelId;
  if (channelIdServerData == 'neworder') {
    await notifee.createChannel({
      id: 'neworder',
      name: 'New Orders',
      lights: false,
      vibration: true,
      importance: Importance.HIGH,
    });
  }
  notifee.displayNotification(notification);
};

const startupTokenServices = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const obtainedToken = await messaging().getToken();
      await FirebaseService.saveTokenToDatabase(obtainedToken);
      messaging().onMessage(onMessageReceived);
      messaging().onTokenRefresh(async token => {
        await FirebaseService.saveTokenToDatabase(token);
      });
      messaging().setBackgroundMessageHandler(onMessageReceived);
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

const ResolveAllPromises = () => {
  return new Promise((resolve, reject) => {
    FirebaseService.set_current_user();
    Promise.all([
      FirebaseService.fetchCategoriesData(),
      FirebaseService.fetchProductsRefsData(),
      FirebaseService.getCarouselOfferts(),
      startupTokenServices()
    ])
      .then(result => {
        resolve({data: result, success: true});
      })
      .catch(error => {
        reject({error, success: false});
      });
  });
};
function* startup() {
  yield put(startupLoading());
  const result = yield call(ResolveAllPromises);
  if (result) {
    console.log(result);
    if (result.success) {

      yield put(fetchCategoriesDataSuccess(result.data[0]));
      yield put(fetchProductsRefsDataSuccess(result.data[1]));
      yield put(carouselOffertsSuccess(result.data[2]))
      yield put(startupSuccess());
      NavigationService.navigateAndResetMain('MainDrawer', {});
      
    } else if (!result.success) {
      yield put(
        startupFailure({
          code: 'ALL_STARTUP_FAILURE',
          error: true,
          error_message: {title: 'Error', message: 'Connection Error'},
        }),
      );
    }
  }
  // startup tokens service
  /*yield call(startupTokenServices)

 */
}

export function* watchStartup() {
  yield takeLatest(STARTUP, startup);
}
