import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationService from 'services/NavigationService';
import {Metrics, Colors} from 'Theme';
import {Badge, Text} from 'native-base';
import IconButton from 'components/IconButton';
import {AppStyles} from 'Theme';
const Header = (
  navigation: any,
  route?: any,
  title?: string,
  cartItemsNumber?: number,
) => {
  return {
    title,
    headerStyle: AppStyles.headerStyles.headerStyle, headerTitleStyle: AppStyles.headerStyles.headerTitleStyle,
    headerLeft: () => {
      return (
        <View style={{paddingHorizontal: Metrics.baseMargin}}>
          <IconButton
            onPress={() => navigation.openDrawer()}
            name="menu"
            size={30}
            color={Colors.gray}
          />
        </View>
      );
    },
    headerRight: () => {
      return (
        <View style={{flexDirection: 'row'}}>
          <IconButton
            onPress={() => {
              NavigationService.navigate('SearchProductsScreen', {});
            }}
            name="magnify"
            color={Colors.gray}
            size={24}
          />
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('CartScreen', {});
            }}
            style={{marginHorizontal: Metrics.baseMargin}}>
            <Icon name="basket" color={Colors.gray} size={24} />
            {route.params.itemsCart !== '0' && (
              <View
                style={{
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 24,
                  height: 24,
                  borderRadius: 50,
                  backgroundColor: 'red',
                  bottom: 12,
                  left: 12,
                }}>
                <Text style={{color: Colors.white}}>
                  {route.params.itemsCart}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      );
    },
  };
};
export default Header;
