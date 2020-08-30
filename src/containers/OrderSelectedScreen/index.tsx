import React from 'react';
import {
  Container,
  OrdersContainer,
  Title,
  OrderDetail,
  OrderDetailTitle,
  OrderDetailValue,
} from './styles';
import {Row, Grid, Col} from 'react-native-easy-grid';
import {View, FlatList} from 'react-native';
import {ProductType} from 'types/Products';
import {OrderData} from 'types/Orders';
import Item from 'components/CategoryScreen/Item';
import {Colors, AppStyles} from 'Theme';
interface OrderSelectedProps {
  route: {
    params: {
      order: OrderData;
    };
  };
}

const OrderSelectedScreen = (props: OrderSelectedProps) => {
  const Order: OrderData = props.route.params.order;
  console.log(Order.products);
  return (
    <Container>
      <Grid>
        <Row size={8}>
          <OrdersContainer>
            <FlatList
              contentContainerStyle={{
                ...AppStyles.FlatListStyles.FlatListContent,
              }}
              keyExtractor={item => item.product_id}
              showsVerticalScrollIndicator={false}
              data={Order.products}
              renderItem={({item}) => {
                return <Item showUnits={true} item={item} />;
              }}
            />
          </OrdersContainer>
        </Row>
        <Row
          style={{
            height: 50,
            backgroundColor: Colors.primary,
            alignItems: 'center',
          }}>
          <Col>
            <OrderDetailTitle>Items</OrderDetailTitle>
            <OrderDetailValue>{Order.orderDetails.Items}</OrderDetailValue>
          </Col>
          <Col>
            <OrderDetailTitle>Savings</OrderDetailTitle>
            <OrderDetailValue>
              {`₹ ${Order.orderDetails.Savings}`}
            </OrderDetailValue>
          </Col>
          <Col>
            <OrderDetailTitle>Total</OrderDetailTitle>
            <OrderDetailValue>{`₹ ${
              Order.orderDetails.Total
            }`}</OrderDetailValue>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};
export default OrderSelectedScreen;
