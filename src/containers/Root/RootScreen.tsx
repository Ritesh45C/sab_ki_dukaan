import React, {ReducerState, useState} from 'react';
import {useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {useDispatch, useSelector, connect} from 'react-redux';
import Loading from 'components/Loading';
import {startup} from 'redux/actions/startupActions';
import NavigationService from 'services/NavigationService';
import Colors from 'Theme/Colors';

import SplashScreen from 'containers/SplashScreen/SplashScreen';
// Drawer Stack
import MainScreen from 'containers/Main';
import RecurringOrderScreen from 'containers/RecurringOrderScreen';
import AccountHistoryScreen from 'containers/AccountHistoryScreen';
import InviteScreen from 'containers/InviteScreen';
import ShoppingCreditsScreen from 'containers/ShoppingCreditsScreen';

// App Stack
import CategoryScreen from 'containers/CategoryScreen';
import ItemSelectedScreen from 'containers/ItemSelectedScreen';
import SearchProductsScreen from 'containers/SearchProductsScreen';
import OrderSelectedScreen from 'containers/OrderSelectedScreen';
import CartScreen from 'containers/CartScreen';
import PersonalInfoScreen from 'containers/PersonalinfoScreen';
import OrderPaymentSelectedScreen from 'containers/OrderPaymentSelected';
import PaymentScreen from 'containers/PaymentScreen';
import ConfirmOrderScreen from 'containers/ConfirmOrderScreen';
import RecurringProductScreen from 'containers/RecurringProductScreen';
// Auth Stack
import InitialScreen from 'containers/Auth';
import LogInScreen from 'containers/Auth/login';
import SelectLocationScreen from 'containers/Auth/signup/SelectLocation';
import SearchLocationScreen from 'containers/SearchLocation';
import UserInfoScreen from 'containers/Auth/signup/UserInfo';
import PhoneVerificationScreen from 'containers/Auth/signup/PhoneVerification';
import OtpVerificationScreen from 'containers/Auth/signup/OtpVerification';
//
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Metrics, AppStyles} from 'Theme';

//
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Header from 'components/Header';
import IconButton from 'components/IconButton';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const backButtonForHeader = (navigation: any) => {
  return (
    <View style={{paddingHorizontal: Metrics.baseMargin}}>
      <IconButton
        onPress={() => navigation.goBack()}
        name="arrow-left"
        size={30}
        color={Colors.gray}
      />
    </View>
  );
};

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="InitialScreen"  screenOptions={{safeAreaInsets: {top: 0}}}>
      <Stack.Screen
        name="InitialScreen"
        component={InitialScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LogInScreen"
        component={LogInScreen}
        options={({route, navigation}) => ({
          title: '',
          headerStyle: AppStyles.headerStyles.headerStyle,
          headerTitleStyle: AppStyles.headerStyles.headerTitleStyle,
          headerLeft: () => backButtonForHeader(navigation),
        })}
      />
      <Stack.Screen
        name="SelectLocationScreen"
        component={SelectLocationScreen}
        options={({route, navigation}) => ({
          title: '',
          headerStyle: AppStyles.headerStyles.headerStyle,
          headerTitleStyle: AppStyles.headerStyles.headerTitleStyle,
          headerLeft: () => backButtonForHeader(navigation),
        })}
      />
      <Stack.Screen
        name="SearchLocationScreen"
        component={SearchLocationScreen}
        options={({route, navigation}) => ({
          title: '',
          headerStyle: AppStyles.headerStyles.headerStyle,
          headerTitleStyle: AppStyles.headerStyles.headerTitleStyle,
          headerLeft: () => backButtonForHeader(navigation),
        })}
      />
      <Stack.Screen
        name="UserInfoScreen"
        component={UserInfoScreen}
        options={({route, navigation}) => ({
          title: '',
          headerStyle: AppStyles.headerStyles.headerStyle,
          headerTitleStyle: AppStyles.headerStyles.headerTitleStyle,
          headerLeft: () => backButtonForHeader(navigation),
        })}
      />
      <Stack.Screen
        name="PhoneVerificationScreen"
        component={PhoneVerificationScreen}
        options={({route, navigation}) => ({
          title: '',
          headerStyle: AppStyles.headerStyles.headerStyle,
          headerTitleStyle: AppStyles.headerStyles.headerTitleStyle,
          headerLeft: () => backButtonForHeader(navigation),
        })}
      />
      <Stack.Screen
        name="OtpVerificationScreen"
        component={OtpVerificationScreen}
        options={({route, navigation}) => ({
          title: '',
          headerStyle: AppStyles.headerStyles.headerStyle,
          headerTitleStyle: AppStyles.headerStyles.headerTitleStyle,
          headerLeft: () => backButtonForHeader(navigation),
        })}
      />
    </Stack.Navigator>
  );
}
function RecurringOrderStack() {
  return (
    <Stack.Navigator
      initialRouteName="RecurringOrderScreen"
      screenOptions={{safeAreaInsets: {top: 0}}}>
      <Stack.Screen
        name="RecurringOrderScreen"
        component={RecurringOrderScreen}
        options={({route, navigation}) =>
          Header(navigation, route, 'Recurring Orders')
        }
        initialParams={{itemsCart: '0'}}
      />
    </Stack.Navigator>
  );
}
function AccountHistoryStack() {
  return (
    <Stack.Navigator
      initialRouteName="AccountHistoryScreen"
      screenOptions={{safeAreaInsets: {top: 0}}}>
      <Stack.Screen
        name="AccountHistoryScreen"
        component={AccountHistoryScreen}
        options={({route, navigation}) => {
          return Header(navigation, route, 'Account History');
        }}
        initialParams={{itemsCart: '0'}}
      />
      <Stack.Screen
        name="OrderSelectedScreen"
        component={OrderSelectedScreen}
        
        options={({route,navigation}) => ({
          //@ts-ignore
          title: route.params.title,
          headerStyle: AppStyles.headerStyles.headerStyle,
          headerTitleStyle: AppStyles.headerStyles.headerTitleStyle,
          headerLeft: () => backButtonForHeader(navigation)
        })}
      />
      <Stack.Screen
        name="OrderPaymentSelected"
        component={OrderPaymentSelectedScreen}
        options={({route,navigation}) => ({
          //@ts-ignore
          title: route.params.title,
          headerStyle: AppStyles.headerStyles.headerStyle,
          headerTitleStyle: AppStyles.headerStyles.headerTitleStyle,
          headerLeft: () => backButtonForHeader(navigation)
        })}
      />
    </Stack.Navigator>
  );
}

function ShoppingCreditsStack() {
  return (
    <Stack.Navigator initialRouteName="ShoppingCreditsScreen"  screenOptions={{safeAreaInsets: {top: 0}}}>
      <Stack.Screen
        name="ShoppingCreditsScreen"
        component={ShoppingCreditsScreen}
        options={({route, navigation}) =>
          Header(navigation, route, 'Shopping Credits')
        }
        initialParams={{itemsCart: '0'}}
      />
    </Stack.Navigator>
  );
}
function InviteStack() {
  return (
    <Stack.Navigator
      initialRouteName="InviteScreen"
      screenOptions={{safeAreaInsets: {top: 0}}}>
      <Stack.Screen
        name="InviteScreen"
        component={InviteScreen}
        options={({route, navigation}) => Header(navigation, route)}
        initialParams={{itemsCart: '0'}}
      />
    </Stack.Navigator>
  );
}
function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{safeAreaInsets: {top: 0}}}>
      <Stack.Screen
        name="Home"
        component={MainScreen}
        options={({route, navigation}) => {
          return Header(navigation, route);
        }}
        initialParams={{itemsCart: 0}}
      />
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={({route, navigation}) => {
          return Header(navigation, route);
        }}
        initialParams={{itemsCart: 0}}
      />

      <Stack.Screen
        name="ItemSelectedScreen"
        component={ItemSelectedScreen}
        options={({route, navigation}) => ({
          title: 'Selected Product',
          headerStyle: AppStyles.headerStyles.headerStyle,
          headerTitleStyle: AppStyles.headerStyles.headerTitleStyle,
          headerLeft: () => backButtonForHeader(navigation),
        })}
      />

      <Stack.Screen
        name="RecurringProductScreen"
        component={RecurringProductScreen}
        options={({route, navigation}) => ({
          title: 'Add recurring order',
          headerStyle: AppStyles.headerStyles.headerStyle,
          headerTitleStyle: AppStyles.headerStyles.headerTitleStyle,
          headerLeft: () => backButtonForHeader(navigation),
        })}
      />

      <Stack.Screen
        name="SearchProductsScreen"
        component={SearchProductsScreen}
        options={({route, navigation}) => ({
          title: 'Search your products',
          headerStyle: AppStyles.headerStyles.headerStyle,
          headerTitleStyle: AppStyles.headerStyles.headerTitleStyle,
          headerLeft: () => backButtonForHeader(navigation),
        })}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={({route, navigation}) => ({
          title: 'Your Cart',
          headerStyle: AppStyles.headerStyles.headerStyle,
          headerTitleStyle: AppStyles.headerStyles.headerTitleStyle,
          headerLeft: () => backButtonForHeader(navigation),
        })}
      />
      <Stack.Screen
        name="PersonalInfoScreen"
        component={PersonalInfoScreen}
        options={({route, navigation}) => ({
          title: 'Personal Info',
          headerStyle: AppStyles.headerStyles.headerStyle,
          headerTitleStyle: AppStyles.headerStyles.headerTitleStyle,
          headerLeft: () => backButtonForHeader(navigation),
        })}
      />
      <Stack.Screen
        name="ConfirmOrderScreen"
        component={ConfirmOrderScreen}
        options={({route, navigation}) => ({
          title: 'Confirm Order',
          headerStyle: AppStyles.headerStyles.headerStyle,
          headerTitleStyle: AppStyles.headerStyles.headerTitleStyle,
          headerLeft: () => backButtonForHeader(navigation),
        })}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={({route, navigation}) => ({
          title: 'Payment with debit or credit card.',
          headerStyle: AppStyles.headerStyles.headerStyle,
          headerTitleStyle: AppStyles.headerStyles.headerTitleStyle,
          headerLeft: () => backButtonForHeader(navigation),
        })}
      />
    </Stack.Navigator>
  );
}

function MainDrawer(props: any) {
  const user = auth().currentUser;
  let isAnonymous: boolean = false;
  if (user) {
    isAnonymous = user.isAnonymous;
  }

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="AppStack"
        component={AppStack}
        options={{
          drawerIcon: () => {
            return <Icon name="home-outline" size={32} />;
          },
          drawerLabel: 'Home',
        }}
      />
      {!isAnonymous && (
        <Drawer.Screen
          name="RecurringOrderStack"
          component={RecurringOrderStack}
          options={{
            drawerIcon: () => {
              return <Icon name="refresh" size={32} />;
            },
            drawerLabel: 'Recurring Orders',
          }}
        />
      )}
      {!isAnonymous && (
                <Drawer.Screen
                name="ShoppingCreditsStack"
                component={ShoppingCreditsStack}
                options={{
                  drawerIcon: () => {
                    return <Icon name="wallet-outline" size={32} />;
                  },
                  drawerLabel: 'Shopping Credits',
                }}
              />
      )}
      <Drawer.Screen
        name="AccountHistoryStack"
        component={AccountHistoryStack}
        options={{
          drawerIcon: () => {
            return <Icon name="checkbox-multiple-blank-outline" size={32} />;
          },
          drawerLabel: 'Account History',
        }}
      />
      <Drawer.Screen
        name="InviteStack"
        component={InviteStack}
        options={{
          drawerIcon: () => {
            return <Icon name="account-multiple-plus-outline" size={32} />;
          },
          drawerLabel: 'Invite',
        }}
      />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props: any) {
  const [user, setUser] = useState(null);
  auth().onAuthStateChanged((result: any) => {
    if (result) {
      setUser(result);
    } else {
      setUser(null);
    }
  });

  return (
    <DrawerContentScrollView contentContainerStyle={{flex: 1}} {...props}>
      <View style={{height: '100%', justifyContent: 'space-between'}}>
        <View style={{justifyContent: 'flex-start'}}>
          <DrawerItemList {...props} />
        </View>

        <View style={{justifyContent: 'flex-end'}}>
          {user && (
            <DrawerItem
              icon={() => <Icon name="logout" size={32} />}
              label="Sign out"
              onPress={() => {
                NavigationService.navigateAndReset('AuthStack', {});
                auth().signOut();
              }}
            />
          )}
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      if (user.providerData.length == 2) {
        dispatch(startup());
      } else {
        if (user.isAnonymous) {
          dispatch(startup());
        } else {
          NavigationService.navigate('AuthStack', {
            screen: 'PhoneVerificationScreen',
            params: {
              onlyOTP: false,
            },
          });
        }
      }
    } else {
      NavigationService.navigateAndReset('AuthStack', {});
    }
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef => {
        NavigationService.setTopLevelNavigator(navigationRef);
      }}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="MainDrawer" component={MainDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
 * Define main RootScreen component
 */

interface StateProps {
  api: {
    loading: boolean;
  };
}
const RootScreen = () => {
  const {loading} = useSelector((state: StateProps) => {
    return state.api;
  });
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Loading visible={loading} />
          <App />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RootScreen;
