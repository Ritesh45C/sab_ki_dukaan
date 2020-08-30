import React from 'react';
import {
  Container,
  ItemDetails,
  ItemTitle,
  ItemSubTitle,
  ItemAvailable,
  ItemActions,
} from './styles';
import {Button, Text} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ProductType} from 'types/Products';
import CustomButton from 'components/CustomButton';
import Colors from 'Theme/Colors';
import {useDispatch, connect} from 'react-redux';
import {addProduct} from 'redux/actions/cartActions';
import ItemAction from 'components/OrderItem/ItemAction';

interface ItemDetailProps {
  itemSelected: ProductType | null;
  item: ProductType;
}
const ItemDetail = (props: ItemDetailProps) => {
  const {item} = props;
  const dispatch = useDispatch();
  let isIntheCart: boolean = false;
  if (props.itemSelected !== null) {
    isIntheCart = true;
  } else {
    isIntheCart = false;
  }
  console.log(isIntheCart);

  const concatItemsName = (items: ProductType[]) => {
    let bundleConcatItemNames: string = '';
    items.map(item => {
      bundleConcatItemNames += `${item.product_name} `;
    });
    const namesTemp = bundleConcatItemNames.split(' ');
    namesTemp.pop();
    bundleConcatItemNames = namesTemp.join(' + ');
    return bundleConcatItemNames;
  };
  if (item.type == 'bundle') {
    const product_name: string = concatItemsName(item.items);

    return (
      <Container>
        <ItemDetails>
          <ItemTitle>{product_name}</ItemTitle>
          <ItemSubTitle>{`${item.product_details}`}</ItemSubTitle>
          <ItemAvailable>{`${item.price} ${item.price_symbol}`}</ItemAvailable>
        </ItemDetails>
        <ItemActions>
          <Button bordered dark>
            <Text style={{color: '#000'}}>
              <Icon name="plus" size={16} /> ADD
            </Text>
          </Button>
        </ItemActions>
      </Container>
    );
  } else if (item.type == 'item') {
    return (
      <Container>
        <ItemDetails>
          <ItemTitle>{item.product_name}</ItemTitle>
          <ItemSubTitle>{`${item.product_details}`}</ItemSubTitle>
          <ItemAvailable>{`${item.price} ${item.price_symbol}`}</ItemAvailable>
        </ItemDetails>
        <ItemActions>
          {!isIntheCart ? (
            <CustomButton
              iconLeft
              setIcon={<Icon name="add" size={16} color={Colors.primary} />}
              bordered
              text="Add"
              onPress={() => {
                dispatch(addProduct(item));
              }}
            />
          ) : (
            <ItemAction data={props.itemSelected} />
          )}
        </ItemActions>
      </Container>
    );
  } else {
    return null;
  }
};

export default ItemDetail;
