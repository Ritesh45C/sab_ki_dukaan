import React from 'react';
import {View, Image} from 'react-native';
import {
  Container,
  ItemDetails,
  ItemTitle,
  ItemSubTitle,
  ItemAvailable,
  ItemActions,
  ItemImage,
  ItemUnits,
} from './styles';

import {ProductType} from 'types/Products';
import ItemAction from './ItemAction';
import CustomButton from 'components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationService from 'services/NavigationService';

interface OrderItemProps extends ProductType{
  edit?: boolean;
  editButton?: boolean;
}

const OrderItem = (props: OrderItemProps) => {
  return (
    <Container>
      <ItemImage>
        <Image
          style={{
            width: 48,
            height: 48,
            resizeMode: 'contain',
          }}
          source={{uri: props.imgurl}}></Image>
      </ItemImage>
      <ItemDetails>
        <ItemTitle>{props.product_name}</ItemTitle>

        <ItemSubTitle>{`${props.product_details}`}</ItemSubTitle>
        <ItemAvailable>{`${props.price_symbol} ${props.price}`}</ItemAvailable>
      </ItemDetails>
      <ItemActions>
        {props.edit ? (
          <ItemAction key={props.product_id+"_action"} data={props} />
        ) : props.editButton ? (
          <CustomButton
            iconLeft
            setIcon={<Icon name="pencil" size={16} />}
            bordered
            text="EDIT"
            onPress={() => {NavigationService.navigate("RecurringProductScreen",{item:props})}}
          />
        ) : (
          <ItemUnits>{props.units} UNITS</ItemUnits>
        )}
      </ItemActions>
    </Container>
  );
};
OrderItem.defaultProps = {
  units: 1,
};
export default OrderItem;
