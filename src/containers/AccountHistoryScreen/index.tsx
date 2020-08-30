import React, {useEffect, useState} from 'react';
import {Container, EmptyTextContainer, EmptyText} from './styles';
import {Tabs, Tab} from 'native-base';
import ItemOrderPlaced from 'components/AccountHistory/ItemOrderPlaced';
import {useDispatch, connect} from 'react-redux';
import {fetchOrderData} from 'redux/actions/orderActions';
import {FlatList, RefreshControl} from 'react-native';
import {OrderData} from 'types/Orders';
import {Colors} from 'Theme';
import {keyGenerator, getOrderDetails} from 'utils/general';
import {ProductType} from 'types/Products';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface AccountHistoryProps {
  navigation: any;
  Orders: {
    orderData: OrderData[];
  };
  Cart: {
    cartProducts: ProductType[];
  };
}
const AccountHistoryScreen = (props: AccountHistoryProps) => {
  const dispatch = useDispatch();

  /*
   useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
        dispatch(fetchOrderData());
    });

    return unsubscribe;
  }, [props.navigation]);
*/

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Orders')
        .onSnapshot(() => {
          dispatch(fetchOrderData());
        });
    }
  }, []);

  const {Cart} = props;
  useEffect(() => {
    const Details = getOrderDetails(Cart.cartProducts);
    props.navigation.setParams({
      itemsCart: Details.Items,
    });
  }, [props.Cart]);

  const TabProps = {
    activeTabStyle: {backgroundColor: Colors.primary},
    tabStyle: {backgroundColor: Colors.primary},
    activeTextStyle: {color: Colors.white},
    textStyle: {color: Colors.white},
    style:{backgroundColor:Colors.gray200}
  };

  const {orderData} = props.Orders;
  if (orderData.length) {
    return (
      <Container>
        <Tabs>
          <Tab {...TabProps} heading="Order">
            <FlatList
              keyExtractor={() => keyGenerator()}
              showsVerticalScrollIndicator={false}
              data={orderData}
              renderItem={({item}) => {
                return <ItemOrderPlaced isPayment={false} {...item} />;
              }}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => {
                    dispatch(fetchOrderData());
                  }}
                />
              }
            />
          </Tab>
          <Tab {...TabProps} heading="Payments">
            <FlatList
              keyExtractor={() => keyGenerator()}
              showsVerticalScrollIndicator={false}
              data={orderData}
              renderItem={({item}) => {
                return <ItemOrderPlaced isPayment={true} {...item} />;
              }}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  } else {
    return (
      <EmptyTextContainer>
        <EmptyText>You have no orders in your account history.</EmptyText>
      </EmptyTextContainer>
    );
  }
};
const mapStateToProps = (reducers: any) => {
  return {Cart: reducers.cart, Orders: reducers.orders};
};
export default connect(mapStateToProps)(AccountHistoryScreen);
