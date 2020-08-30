import React from 'react';
import {ItemContainer, Title, Quantity, Price} from './styles';
import {Product} from 'types/Products';
import {Image} from 'react-native';
const ItemOffert = (props: Product) => {
  return (
    <ItemContainer>
      <Image
        style={{
          width: 72,
          height: 72,
          resizeMode: 'contain',
        }}
        source={{uri: props.imgurl}}></Image>
      <Title>{props.product_name}</Title>
      <Quantity>{`${props.product_details}`}</Quantity>
      <Price>{`${props.price_symbol} ${props.price} `}</Price>
    </ItemContainer>
  );
};
export default ItemOffert;
