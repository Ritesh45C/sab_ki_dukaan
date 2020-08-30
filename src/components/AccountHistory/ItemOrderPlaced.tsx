import React from 'react';
import {
  Container,
  OrderDateContainer,
  MonthText,
  DayText,
  OrderDetailContainer,
  PriceText,
  ItemsText,
  OrderContainer,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from 'Theme/Colors';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {OrderData} from 'types/Orders';
interface ItemOrderPlaced extends OrderData {
  isPayment: boolean;
}

interface DateType {
  dayofweek: string;
  month: string;
  day: string;
}

const ItemOrderPlaced = (props: ItemOrderPlaced) => {
  let unix_timestamp = props.createDate.seconds;
  const dateData = new Date(unix_timestamp * 1000);
  const dateObjSplit = dateData.toDateString().split(' ');
  let DateResult: DateType = {
    dayofweek: dateObjSplit[0],
    month: dateObjSplit[1],
    day: dateObjSplit[2],
  };
  return (
    <Container>
      <OrderContainer
        onPress={() => {
          if (!props.isPayment) {
            NavigationService.navigate('OrderSelectedScreen', {title:`${DateResult.day} ${DateResult.month} ${DateResult.dayofweek}`,order: props});
          } else {
            NavigationService.navigate('OrderPaymentSelected', {title:`${DateResult.day} ${DateResult.month} ${DateResult.dayofweek}`, order: props});
          }
        }}>
        <OrderDateContainer>
          <MonthText>{`${DateResult.day} ${DateResult.month}`}</MonthText>
          <DayText>{`${DateResult.dayofweek}`}</DayText>
        </OrderDateContainer>
        <OrderDetailContainer>
        <ItemsText style={{color:props.payment.paid_out?Colors.success:Colors.error}}>
            {`${props.payment.paid_out? 'Paid out': 'You did not complete the payment.'}`}
          </ItemsText>
        </OrderDetailContainer>

        <OrderDetailContainer>
          {props.isPayment ? (
            <View style={{flexDirection: 'row'}}>
              <Icon name="arrow-bottom-right" color={Colors.gray} size={24} />
              <PriceText>{`₹ ${props.orderDetails.Total}`}</PriceText>
            </View>
          ) : (
            <PriceText>{`₹ ${props.orderDetails.Total}`}</PriceText>
          )}

          <ItemsText>
            {props.isPayment
              ? `${props.method}`
              : `${props.orderDetails.Items} Items`}{' '}
          </ItemsText>
    
        </OrderDetailContainer>
      </OrderContainer>
    </Container>
  );
};

export default ItemOrderPlaced;
