import React, {useEffect, useState} from 'react';
import {
  Container,
  OrdersContainer,
  Title,
  RecurringTypeContainer,
  EmptyTextContainer,
  EmptyText,
} from './styles';
import OrderItem from 'components/OrderItem';
import {ProductType} from 'types/Products';
import FirebaseService from 'services/FirebaseService';
import {FlatList, ScrollView} from 'react-native';
import Item from 'components/CategoryScreen/Item';
import {getOrderDetails} from 'utils/general';
import {connect, useDispatch} from 'react-redux';
import LoadingModalSingleton from 'components/Loading';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

type CartProductsType = {
  cartProducts: ProductType[];
};
interface RecurringOrderProps {
  cart: CartProductsType;
  navigation: any;
}

interface RecurringOrderTypes {
  RecurringOrders: RecurringOrderType[];
  ProductsPlaced: ProductType[];
}
type RecurringOrderType = {
  product_id: string;
  schedule: any;
  type: string;
  startAt: Date;
};

const options = [
  {
    key: 'weekly',
    text: 'Weekly',
  },
  {
    key: 'onceintwoweeks',
    text: 'Once in 2 Weeks',
  },
  {
    key: 'onceinfourweeks',
    text: 'Once in 4 Weeks',
  },
];

const RecurringOrderScreen = (props: RecurringOrderProps) => {
  const [orders, setOrders] = useState<RecurringOrderTypes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const componentDidMount = () => {
    const user = auth().currentUser;
    if (user) {
      firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('RecurringOrders')
        .onSnapshot(() => {
        
          setIsLoading(true);
          FirebaseService.GetRecurringOrders()
            .then(result => {
              if(result == 'isempty'){
                setOrders(null);
                setIsLoading(false);
                return;
              }
              result.RecurringOrders.map((placed: RecurringOrderType) => {
                const ProductId = placed.product_id;
                const isProduct = ({product_id}: ProductType) =>
                  product_id == ProductId;
                const Index = result.ProductsPlaced.findIndex(isProduct);
                result.ProductsPlaced[Index] = {
                  ...result.ProductsPlaced[Index],
                  recurringType: placed.type,
                };
              });
              setOrders(result);
              setIsLoading(false);
            })
            .catch(error => {
              setIsLoading(false);
            });
        }, (error) => {
           console.log(error)
        });
    }
  };
  useEffect(componentDidMount, []);

  const {cart} = props;
  useEffect(() => {
    const Details = getOrderDetails(cart.cartProducts);
    props.navigation.setParams({
      itemsCart: Details.Items,
    });
  }, [cart]);

  return (
    <Container>
      <LoadingModalSingleton visible={isLoading} />
      <ScrollView contentContainerStyle={{flex: 1}}>
        {orders ? (
          options.map(option => {
            const ItIsProductOfOption = ({recurringType}: any) =>
              recurringType == option.key;
            const Filtered = orders.ProductsPlaced.filter(ItIsProductOfOption);
            if (Filtered.length) {
              return (
                <OrdersContainer>
                  <Title>{option.text}</Title>
                  {Filtered.map((product, index) => {
                    return (
                      <Item key={index} showEditButton={true} item={product} />
                    );
                  })}
                </OrdersContainer>
              );
            }
          })
        ) : (
          <EmptyTextContainer>
            <EmptyText>
              You have no recurring orders, browse through the categories and
              add a product.
            </EmptyText>
          </EmptyTextContainer>
        )}
      </ScrollView>
    </Container>
  );
};

const mapStateToProps = (reducer: any) => {
  return {cart: reducer.cart};
};
export default connect(mapStateToProps)(RecurringOrderScreen);
